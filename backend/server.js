import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT;

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