import {
  FileText,
  MessageSquare,
  Upload,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="page-header">

        <div>
          <h1>Welcome back</h1>

          <p>
            Ask questions and get answers from your documents.
          </p>
        </div>

        <Link
          to="/upload"
          className="primary-button"
        >
          <Upload size={18} />
          Upload Document
        </Link>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <FileText size={24} />

          <div>
            <span>Documents</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <MessageSquare size={24} />

          <div>
            <span>Conversations</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <MessageSquare size={24} />

          <div>
            <span>Questions Asked</span>
            <strong>0</strong>
          </div>
        </div>

      </div>

      <div className="dashboard-section">

        <div className="section-header">

          <div>
            <h2>Get started</h2>

            <p>
              Upload your documents and start asking questions.
            </p>
          </div>

        </div>

        <div className="quick-actions">

          <Link
            to="/upload"
            className="action-card"
          >
            <Upload size={28} />

            <div>
              <h3>Upload documents</h3>

              <p>
                Add PDFs, Word files, text files and more.
              </p>
            </div>

            <span>→</span>
          </Link>

          <Link
            to="/chat"
            className="action-card"
          >
            <MessageSquare size={28} />

            <div>
              <h3>Start a conversation</h3>

              <p>
                Ask questions about your documents.
              </p>
            </div>

            <span>→</span>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;