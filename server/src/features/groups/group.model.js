import mongoose from "mongoose";
import { generateInviteCode, validateInviteCode } from '../../utils/inviteCodeGenerator.js';

const groupSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true,
        maxlength: 50
    },
    description: { 
        type: String, 
        trim: true,
        maxlength: 200
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    admin: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }],
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }],
    totalExpenses: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'] // Add more currencies as needed
    },
    inviteCode: {
        type: String,
        unique: true,
        validate: {
            validator: validateInviteCode,
            message: 'Invalid invite code format'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to generate invite code if not provided
groupSchema.pre('save', function(next) {
    // Only generate if inviteCode is not already set
    if (!this.inviteCode) {
        // Ensure uniqueness by checking existing codes
        this.inviteCode = generateInviteCode();
    }
    next();
});

const groups = mongoose.model("group", groupSchema);

export default groups;