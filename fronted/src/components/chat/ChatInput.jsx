import { useState } from "react";
import { Send } from "lucide-react";

function ChatInput({ onSend, disabled = false }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        className="chat-input"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something about your documents..."
        rows={1}
        disabled={disabled}
      />

      <button
        type="submit"
        className="chat-send-button"
        disabled={disabled || !message.trim()}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

export default ChatInput;