import { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        onSend(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
            />

            <button type="submit">
                Send
            </button>
        </form>
    );
};

export default MessageInput;