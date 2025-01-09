import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

const groups = mongoose.model("group", groupSchema);

export default groups;