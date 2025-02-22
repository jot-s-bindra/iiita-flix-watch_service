// models/Video.js
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'done'] },
    bucket: { type: String, required: true }, // S3 bucket name
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', VideoSchema);
