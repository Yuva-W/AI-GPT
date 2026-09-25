import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB is connected.")
    } catch (error) {
        console.log("failed to connect to db :",error.message);
        process.exit(1);
    }
};

export default connectDB;