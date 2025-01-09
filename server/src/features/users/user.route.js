import express from 'express';
import { getProfile, updateProfile, getAllUsers, getUserById } from './user.controller.js';
import verifyToken from '../auth/auth.middleware.js';

const router = express.Router();

// All routes are protected with verifyToken
router.get('/profile', verifyToken, getProfile);           // Get own profile
router.put('/profile', verifyToken, updateProfile);        // Update own profile
router.get('/users', verifyToken, getAllUsers);           // Get all users (for groups)
router.get('/users/:id', verifyToken, getUserById);      // Get specific user

export default router;