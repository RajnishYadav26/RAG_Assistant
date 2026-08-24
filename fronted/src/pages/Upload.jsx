import { useState } from "react";

import UploadBox from "../components/documents/UploadBox";
import DocumentCard from "../components/documents/DocumentCard";
import DocumentEmptyState from "../components/documents/DocumentEmptyState";

import "./Upload.css";


function Upload() {

  const [documents, setDocuments] =
    useState([]);

  const [isUploading, setIsUploading] =
    useState(false);


  const handleFileSelect = (file) => {

    setIsUploading(true);


    const newDocument = {
      id: Date.now(),

      name: file.name,

      size:
        `${(file.size / 1024 / 1024).toFixed(2)} MB`,

      status: "processing",
    };


    setDocuments((previous) => [
      ...previous,
      newDocument,
    ]);


    // Temporary processing simulation.

    setTimeout(() => {

      setDocuments((previous) =>
        previous.map((document) =>
          document.id === newDocument.id
            ? {
                ...document,
                status: "ready",
              }
            : document
        )
      );

      setIsUploading(false);

    }, 2000);

  };


  const handleDelete = (id) => {

    setDocuments((previous) =>
      previous.filter(
        (document) =>
          document.id !== id
      )
    );

  };


  return (
    <div className="documents-page">

      {/* Header */}

      <div className="documents-header">

        <div>

          <h1>
            Documents
          </h1>

          <p>
            Upload and manage your knowledge
            documents.
          </p>

        </div>

      </div>


      {/* Upload */}

      <div className="documents-content">

        <UploadBox
          onFileSelect={handleFileSelect}
          isUploading={isUploading}
        />


        {/* Documents */}

        <div className="documents-section">

          <div className="documents-section-header">

            <h2>
              Your documents
            </h2>

            <span>
              {documents.length} document
              {documents.length !== 1
                ? "s"
                : ""}
            </span>

          </div>


          {documents.length === 0 ? (

            <DocumentEmptyState />

          ) : (

            <div className="document-list">

              {documents.map(
                (document) => (

                  <DocumentCard
                    key={document.id}
                    document={document}
                    onDelete={
                      handleDelete
                    }
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Upload;