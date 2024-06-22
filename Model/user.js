const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    password: { type: String, default:"$2b$10$4CTT7IdH33c29K/U3dk4jetf6et2IAo7FitDPTAtx38UsUDSZ10Uy" },
    role: { type: String, default: 'Admin' },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);
