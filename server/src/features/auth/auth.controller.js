import users from "../users/user.model.js";
import { genHash, compareHash } from "../../utils/genHash.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Input validation
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

        // Check for existing user
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash password
        const hashedPassword = await genHash(password);
        
        // Prepare user data
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone
        };

        // Create and save user
        try {
            const newUser = new users(userData);
            await newUser.save();

            return res.status(201).json({ 
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        } catch (saveError) {
            // Detailed error handling
            if (saveError.name === 'ValidationError') {
                return res.status(400).json({
                    message: "Validation Error",
                    errors: Object.values(saveError.errors).map(err => err.message)
                });
            }

            if (saveError.code === 11000) {
                return res.status(409).json({
                    message: "Duplicate key error",
                    field: Object.keys(saveError.keyPattern)[0]
                });
            }

            return res.status(500).json({ 
                message: "Error creating user", 
                error: saveError.message 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            message: "Unexpected error during registration", 
            error: error.message 
        });
    }
};

export const login = async (req, res) => {
    const {email,password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await users.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isValid=await compareHash(password,user.password);
        if(!isValid){
            return res.status(401).json({ message: "Invalid password" });
        }
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "Error during login", error:error.message });
    }
}