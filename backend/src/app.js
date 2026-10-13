import express from 'express';
import "dotenv/config";
import cors from 'cors';
import chat from "./routes/chat.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/", chat);

export default app;