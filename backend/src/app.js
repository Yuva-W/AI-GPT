import express from 'express';
import "dotenv/config";
import cors from 'cors';
import getResponse from './services/aiService.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use("/",async (req, res) => {
    try {
        const response = await getResponse(
            "what is 2+2"
        );

        console.log("this is req page");
        console.log(response);

        res.json({
            success: true,
            message: "AI-GPT Chat Assistant",
        });
    } catch (error) {
        console.log(error.message);
    }
});

export default app;