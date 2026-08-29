import {
  Upload,
  FileUp,
} from "lucide-react";

function UploadBox({
  onFileSelect,
  isUploading,
}) {

  const handleChange = (event) => {

    const file =
      event.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }

  };


  return (
    <label className="upload-box">

      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleChange}
        disabled={isUploading}
        hidden
      />

      <div className="upload-icon">

        {isUploading ? (
          <FileUp size={28} />
        ) : (
          <Upload size={28} />
        )}

      </div>

      <h3>

        {isUploading
          ? "Uploading document..."
          : "Upload a document"}

      </h3>

      <p>
        PDF, DOC, DOCX or TXT
      </p>

      {!isUploading && (
        <span>
          Click to browse files
        </span>
      )}

    </label>
  );
}

export default UploadBox;