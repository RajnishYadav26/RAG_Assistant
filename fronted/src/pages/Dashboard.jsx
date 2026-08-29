import {
  FileText,
  MessageSquare,
  Upload,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Documents",
      value: "12",
      icon: FileText,
    },
    {
      title: "Questions Asked",
      value: "48",
      icon: MessageSquare,
    },
  ];

  const recentDocuments = [
    {
      name: "Company Policy.pdf",
      date: "Today",
    },
    {
      name: "Project Documentation.pdf",
      date: "Yesterday",
    },
    {
      name: "Research Report.pdf",
      date: "Aug 25, 2026",
    },
  ];

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Manage your documents and ask questions
            using your knowledge base.
          </p>
        </div>

        <Link
          to="/upload"
          className="dashboard-upload-button"
        >
          <Upload size={18} />
          Upload Document
        </Link>

      </div>


      <div className="dashboard-content">

        <div className="dashboard-stats">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                className="dashboard-stat-card"
                key={stat.title}
              >
                <div className="dashboard-stat-icon">
                  <Icon size={21} />
                </div>

                <div>
                  <p>{stat.title}</p>

                  <h2>{stat.value}</h2>
                </div>
              </div>
            );
          })}

        </div>


        <div className="dashboard-grid">

          <section className="dashboard-section">

            <div className="dashboard-section-header">

              <h2>Recent Documents</h2>

              <Link to="/upload">
                View all
                <ArrowRight size={15} />
              </Link>

            </div>


            <div className="dashboard-document-list">

              {recentDocuments.map((document) => (

                <div
                  className="dashboard-document"
                  key={document.name}
                >

                  <div className="dashboard-document-icon">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h3>{document.name}</h3>
                    <p>{document.date}</p>
                  </div>

                </div>

              ))}

            </div>

          </section>


          <section className="dashboard-section dashboard-start">

            <div className="dashboard-start-icon">
              <MessageSquare size={25} />
            </div>

            <h2>Start a conversation</h2>

            <p>
              Ask questions and get answers based
              on your uploaded documents.
            </p>

            <Link
              to="/chat"
              className="dashboard-chat-button"
            >
              Start Chat
              <ArrowRight size={17} />
            </Link>

          </section>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;