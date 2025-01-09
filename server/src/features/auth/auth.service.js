import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import users from '../users/user.model.js';

// Business logic for authentication
export const authService = {
    // Register new user
    async register(userData) {
        const { password, ...otherData } = userData;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user with hashed password
        const user = new users({
            ...otherData,
            password: hashedPassword
        });
        
        return user.save();
    },

    // Login user
    async login(email, password) {
        // Find user
        const user = await users.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        // Generate token
        const token = this.generateToken(user._id);
        
        return { token, user };
    },

    // Generate JWT token
    generateToken(userId) {
        return jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }
};