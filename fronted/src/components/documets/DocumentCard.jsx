import {
  FileText,
  Trash2,
  CheckCircle,
  Loader2,
} from "lucide-react";

function DocumentCard({
  document,
  onDelete,
}) {

  return (
    <div className="document-card">

      <div className="document-icon">
        <FileText size={22} />
      </div>


      <div className="document-info">

        <h3>
          {document.name}
        </h3>

        <p>
          {document.size}
        </p>

      </div>


      <div className="document-status">

        {document.status === "processing" ? (
          <>
            <Loader2
              size={16}
              className="document-spinner"
            />

            <span>
              Processing
            </span>
          </>
        ) : (
          <>
            <CheckCircle size={16} />

            <span>
              Ready
            </span>
          </>
        )}

      </div>


      <button
        type="button"
        className="document-delete"
        onClick={() =>
          onDelete(document.id)
        }
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}

export default DocumentCard;