import express from 'express';

const router = express.Router();


// // All routes are protected with verifyToken
// router.get('/profile', getProfile);           // Get own profile
// router.put('/profile', updateProfile);        // Update own profile
// router.get('/users', getAllUsers);           // Get all users (for groups)
// router.get('/users/:id', getUserById);      // Get specific user

export default router;