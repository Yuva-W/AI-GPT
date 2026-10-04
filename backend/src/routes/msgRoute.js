import express from "express";
import getResponse from '../services/aiService.js';
import Message from './../models/msgModel.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("working");
});

router.post("/new", async (req, res) => {
    try {
        const { message } = req.body;

        console.log(message)

        await Message.create({
            role: "user",
            content: message
        });

        const response = await getResponse(message);

        await Message.create({
            role: "assistant",
            content: response
        });

        res.status(200).json({
            success: true,
            response,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `${error.message}`
        });
    }
});

export default router;