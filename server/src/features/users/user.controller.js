import users from "./user.model.js";
import { userService } from './user.service.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // TODO: Add password hashing (for security)
    
    const newUser = new users({
      name,
      email,
      password,
      phone
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

export const getProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.userId);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.userId, req.body);
        return res.status(200).json({ 
            message: "Profile updated successfully",
            user: updatedUser 
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await userService.searchUsers(query);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
