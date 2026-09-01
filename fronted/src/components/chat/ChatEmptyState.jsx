import { MessageSquare } from "lucide-react";

function ChatEmptyState() {
  return (
    <div className="chat-empty-state">
      <div className="chat-empty-icon">
        <MessageSquare size={28} />
      </div>

      <h2>Start a conversation</h2>

      <p>
        Ask a question about your uploaded documents and
        the assistant will help you find the answer.
      </p>
    </div>
  );
}

export default ChatEmptyState;