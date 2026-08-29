import { FileText } from "lucide-react";

function DocumentEmptyState() {
  return (
    <div className="document-empty-state">

      <div className="document-empty-icon">
        <FileText size={28} />
      </div>

      <h2>
        No documents yet
      </h2>

      <p>
        Upload your first document to start
        asking questions about it.
      </p>

    </div>
  );
}

export default DocumentEmptyState;