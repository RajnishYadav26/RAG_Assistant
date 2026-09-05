import os
import uuid
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import Document, User
from app.schemas.document import DocumentResponse


router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


# ==========================================
# CONFIGURATION
# ==========================================

UPLOAD_DIR = Path("uploads")

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_CONTENT_TYPE = "application/pdf"


# ==========================================
# UPLOAD DOCUMENT
# ==========================================

@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # --------------------------------------
    # Validate filename
    # --------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A filename is required.",
        )

    # --------------------------------------
    # Validate file type
    # --------------------------------------

    if file.content_type != ALLOWED_CONTENT_TYPE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed.",
        )

    # --------------------------------------
    # Read file
    # --------------------------------------

    file_data = await file.read()

    # --------------------------------------
    # Validate file size
    # --------------------------------------

    if len(file_data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size must not exceed 10 MB.",
        )

    if len(file_data) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty.",
        )

    # --------------------------------------
    # Create upload directory
    # --------------------------------------

    UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    # --------------------------------------
    # Generate safe unique filename
    # --------------------------------------

    stored_filename = (
        f"{uuid.uuid4().hex}.pdf"
    )

    file_path = (
        UPLOAD_DIR / stored_filename
    )

    # --------------------------------------
    # Save file
    # --------------------------------------

    try:
        file_path.write_bytes(file_data)

    except OSError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save the uploaded file.",
        )

    # --------------------------------------
    # Create database record
    # --------------------------------------

    document = Document(
        filename=file.filename,
        stored_filename=stored_filename,
        file_path=str(file_path),
        file_size=len(file_data),
        content_type=file.content_type,
        processing_status="uploaded",
        user_id=current_user.id,
    )

    try:
        db.add(document)
        db.commit()
        db.refresh(document)

    except Exception:
        db.rollback()

        # Remove physical file if DB operation fails
        if file_path.exists():
            try:
                file_path.unlink()
            except OSError:
                pass

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to create document record.",
        )

    return document

# ==========================================
# LIST USER DOCUMENTS
# ==========================================

@router.get(
    "",
    response_model=list[DocumentResponse],
)
def list_documents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(Document)
        .filter(
            Document.user_id == current_user.id
        )
        .order_by(
            Document.uploaded_at.desc()
        )
        .all()
    )

    return documents

# ==========================================
# GET SINGLE DOCUMENT
# ==========================================

@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def get_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    return document

# ==========================================
# DELETE DOCUMENT
# ==========================================

@router.delete(
    "/{document_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    file_path = Path(document.file_path)

    # Delete physical PDF
    if file_path.exists():
        try:
            file_path.unlink()
        except OSError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unable to delete document file.",
            )

    # Delete database record
    db.delete(document)
    db.commit()

    return None