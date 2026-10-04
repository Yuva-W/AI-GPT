import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import sendMessage from "../services/api";

const Chat = () => {
    const [messages, setMessages] = useState([]);

    const handleSend = async (message) => {
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: message
            }
        ]);

        try {
            const data = await sendMessage(message);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.response
                }
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <MessageList messages={messages} />

            <MessageInput onSend={handleSend} />
        </div>
    );
};

export default Chat;