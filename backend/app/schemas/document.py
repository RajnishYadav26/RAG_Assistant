from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DocumentResponse(BaseModel):
    id: int
    filename: str
    stored_filename: str
    file_size: int
    content_type: str
    processing_status: str
    uploaded_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )