import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model.Message || mongoose.model("Message", messageSchema);

export default Message;