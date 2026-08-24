import { MessageSquare } from "lucide-react";

function ChatEmptyState() {
  return (
    <div className="chat-empty-state">

      <div className="chat-empty-icon">
        <MessageSquare size={28} />
      </div>

      <h2>
        Ask your documents anything
      </h2>

      <p>
        Upload documents and start asking questions.
        Your answers will be based on the information
        contained in your documents.
      </p>

    </div>
  );
}

export default ChatEmptyState;