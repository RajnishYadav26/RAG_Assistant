import { useState } from "react";

import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import ChatEmptyState from "../components/chat/ChatEmptyState";

import "./Chat.css";


function Chat() {

  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);


  const handleSubmit = async () => {

    const question = input.trim();

    if (!question || isLoading) {
      return;
    }


    const userMessage = {
      role: "user",
      content: question,
    };


    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");

    setIsLoading(true);


    // Temporary frontend response.
    // Backend will replace this later.

    setTimeout(() => {

      const assistantMessage = {
        role: "assistant",

        content:
          "This is a sample response from your RAG Assistant. The real answer will come from your uploaded documents after we connect the FastAPI backend.",

        sources: [
          {
            name: "Sample Document.pdf",
            page: 4,
          },
          {
            name: "Company Policy.pdf",
            page: 8,
          },
        ],
      };


      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      setIsLoading(false);

    }, 1200);

  };


  return (
    <div className="chat-page">

      {/* Header */}

      <div className="chat-header">

        <div>

          <h1>
            Chat
          </h1>

          <p>
            Ask questions about your documents
          </p>

        </div>

      </div>


      {/* Messages */}

      <div className="chat-messages">

        {messages.length === 0 ? (
          <ChatEmptyState />
        ) : (

          <>
            {messages.map(
              (message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                />
              )
            )}

            {isLoading && (
              <div className="chat-loading">

                <div className="loading-dots">

                  <span />
                  <span />
                  <span />

                </div>

                <span>
                  RAG Assistant is thinking...
                </span>

              </div>
            )}
          </>

        )}

      </div>


      {/* Input */}

      <div className="chat-input-wrapper">

        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />

        <p className="chat-input-hint">
          Press Enter to send · Shift + Enter
          for a new line
        </p>

      </div>

    </div>
  );
}

export default Chat;