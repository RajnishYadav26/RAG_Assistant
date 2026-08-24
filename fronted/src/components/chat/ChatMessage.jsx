import { Bot, User } from "lucide-react";

import SourceList from "./SourceList";

function ChatMessage({ message }) {

  const isUser =
    message.role === "user";

  return (
    <div
      className={
        isUser
          ? "chat-message user-message"
          : "chat-message assistant-message"
      }
    >

      <div className="message-avatar">

        {isUser ? (
          <User size={18} />
        ) : (
          <Bot size={18} />
        )}

      </div>


      <div className="message-content">

        <div className="message-name">

          {isUser
            ? "You"
            : "RAG Assistant"}

        </div>

        <div className="message-text">
          {message.content}
        </div>


        {!isUser && (
          <SourceList
            sources={message.sources}
          />
        )}

      </div>

    </div>
  );
}

export default ChatMessage;