const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

}, {timestamps:true});

module.exports = mongoose.model('category', categorySchema);