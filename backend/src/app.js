import express from 'express';
import "dotenv/config";
import cors from 'cors';
import msgRoute from "./routes/msgRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/", msgRoute);

export default app;