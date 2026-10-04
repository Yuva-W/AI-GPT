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

const threadSchema = new mongoose.Schema(
    {
        threadId:{
            type: String,
            unique: true,
            required: true
        },
        title:{
            type: String,
            default: "New Chat."
        },
        messages: [messageSchema],
        createdAt:{
            type: Date,
            default: Date.now
        },
        updatedAt:{
            type: Date,
            default: Date.now
        }
    }
)

const Thread = mongoose.model.thread || mongoose.model("thread", threadSchema);

export default Thread;