import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/connectDB.js";
import userRoutes from "./src/features/users/user.route.js";
import authRoutes from "./src/features/auth/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api',authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});