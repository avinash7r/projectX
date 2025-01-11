import users from "../users/user.model.js";
import { genHash, compareHash } from "../../utils/genHash.js";
import { generateToken } from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: {
                    name: !name,
                    email: !email,
                    password: !password,
                    phone: !phone
                }
            });
        }

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await genHash(password);
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone
        };

        const newUser = new users(userData);
        await newUser.save();

        // Generate JWT token expiring in 1d
        const payload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };
        const token = generateToken(payload);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token: token
        });

    } catch (error) {
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await users.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValid = await compareHash(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful" });
};