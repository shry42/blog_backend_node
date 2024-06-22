const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    photo: { public_id: String, url: String },
    title: { type: String, required: true },
    category: { type: String },
    description: { type: String, required: true},
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, {timestamps:true});

module.exports = mongoose.model('blog', blogSchema);
