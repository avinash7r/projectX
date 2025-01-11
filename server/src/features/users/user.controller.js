import { genHash, compareHash } from "../../utils/genHash.js";
import users from "./user.model.js";

export const getProfile = async (req, res) => {
    const userId = req.user.id;
    const user = await users.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
};

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, phone } = req.body;
    if (req.body.password) {
        return res.status(400).json({ message: "Password cannot be updated" });
    }
    const updatedUser = await users.findOneAndUpdate(
        { _id: userId },
        { name, email , phone },
        { new: true }
    );
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({updatedUser, message: "Profile updated successfully"});
};

export const updatePassword = async (req, res) => {
    const userId = req.user.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const user= await users.findById(userId);
    const isValid = await compareHash(oldPassword, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid old password" });
    }
    const hashedPassword = await genHash(newPassword);
    const updatedUser = await users.findOneAndUpdate(
        { _id: userId },
        { password: hashedPassword },
        { new: true }
    );
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({updatedUser, message: "Password updated successfully"});
};