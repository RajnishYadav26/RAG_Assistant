import { FileText } from "lucide-react";

function SourceList({ sources = [] }) {

  if (!sources.length) {
    return null;
  }

  return (
    <div className="source-list">

      <div className="source-title">
        Sources
      </div>

      <div className="source-items">

        {sources.map((source, index) => (
          <div
            className="source-item"
            key={index}
          >

            <FileText size={16} />

            <div className="source-content">

              <span className="source-name">
                {source.name}
              </span>

              <span className="source-page">
                Page {source.page}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SourceList;