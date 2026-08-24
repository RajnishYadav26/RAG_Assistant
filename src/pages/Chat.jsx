import { Send, Paperclip } from "lucide-react";

import "./Chat.css";

function Chat() {
  return (
    <div className="chat-page">

      <div className="chat-header">

        <div>
          <h1>AI Assistant</h1>

          <p>
            Ask questions about your documents.
          </p>
        </div>

      </div>


      <div className="chat-container">

        <div className="chat-empty">

          <h2>
            How can I help you?
          </h2>

          <p>
            Ask a question about your uploaded documents.
          </p>

        </div>


        <div className="chat-input-container">

          <button className="icon-button">
            <Paperclip size={20} />
          </button>

          <input
            type="text"
            placeholder="Ask a question..."
          />

          <button className="send-button">
            <Send size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;