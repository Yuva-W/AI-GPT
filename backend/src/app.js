import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI-GPT Chat Assistant",
    });
});

export default app;