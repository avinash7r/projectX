import users from "../users/user.model.js";
import jwt from "jsonwebtoken";
import { authService } from './auth.service.js';

// Register new user
export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        return res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        return res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(401).json({ message: "Login failed", error: error.message });
    }
};
