const Message = ({ role, content }) => {
    return (
        <div>
            <strong>{role === "user" ? "You" : "Assistant"}:</strong>
            <p>{content}</p>
        </div>
    );
};

export default Message;