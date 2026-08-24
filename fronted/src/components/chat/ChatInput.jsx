import {
  Send,
  Paperclip,
} from "lucide-react";

function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}) {

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      onSubmit();
    }

  };


  return (
    <div className="chat-input-container">

      <button
        type="button"
        className="chat-attachment-button"
        title="Attach document"
      >
        <Paperclip size={20} />
      </button>


      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about your documents..."
        rows={1}
        disabled={disabled}
      />


      <button
        type="button"
        className="chat-send-button"
        onClick={onSubmit}
        disabled={
          disabled ||
          !value.trim()
        }
      >
        <Send size={19} />
      </button>

    </div>
  );
}

export default ChatInput;