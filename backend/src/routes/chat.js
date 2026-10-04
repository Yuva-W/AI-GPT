import express from "express";
import getResponse from '../services/aiService.js';
import Thread from './../models/Thread.js';

const router = express.Router();

// Get all threads
router.get("/threads", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed to fetch threads"});
    }
});

// Get single thread
router.get("/threads/:threadId", async (req, res) => {
    const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId});

        if (!thread){
            res.status(404).json({
                error: "No thread found.!"
            })
        }

        res.status(200).json(thread);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "failed to fetch thread"});
    }
});

// Delete Single thread
router.delete("/threads/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOneAndDelete({threadId});

        if (!thread) {
            res.status(404).json({error: "failed to delete"});
        }

        res.status(200).json({
            success: true,
            message: "deleted."
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({error: "failed to fetch thread"});
    }
});

// Create new chat
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            //create new thread
            thread = new Thread({
                threadId,
                title: message,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            });

        } else {
            thread.messages.push({
                role: "user",
                content: message
            });
        }
        
        const aiResponse = await getResponse(message);

        thread.messages.push({
            role: "assistant",
            content: aiResponse
        });
        thread.updatedAt= new Date();

        await thread.save();

        res.status(200).json({
            replay: aiResponse
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// test route
// router.post("/test", async (req, res) => {
//     const {threadId, title} = req.body;

//     try {
//         const response = await Thread.create({
//             threadId,
//             title
//         });

//         res.send(response);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: "failed to save in db"})
//     }
// });

export default router;