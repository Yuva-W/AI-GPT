import Message from "./Message";

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((message, index) => (
                <Message
                    key={index}
                    role={message.role}
                    content={message.content}
                />
            ))}
        </div>
    );
};

export default MessageList;