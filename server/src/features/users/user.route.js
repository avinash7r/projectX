import express from 'express';
const router = express.Router();
import {authenticationMiddleware} from "../../features/auth/auth.middleware.js";
import {getProfile, updateProfile, updatePassword} from "./user.controller.js";

// // All routes are protected with verifyToken
router.get('/profile', authenticationMiddleware, getProfile);           // Get own profile
router.put('/profile', authenticationMiddleware, updateProfile);        // Update own profile
router.patch('/password', authenticationMiddleware, updatePassword);      // Update own password
// router.get('/users', getAllUsers);           // Get all users (for groups)
// router.get('/users/:id', getUserById);      // Get specific user

export default router;