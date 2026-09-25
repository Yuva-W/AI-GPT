import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`app is running at port ${PORT}`);
        });
    } catch (error) {
        console.log("error :",error.message);
    }
};

startServer();