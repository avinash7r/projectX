import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected at ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};