// routes/watchRoute.js
const express = require('express');
const router = express.Router();
const { getPresignedUrl } = require('../controllers/watchController');

// ✅ GET Pre-signed URL
router.get('/api/watch/:userId/:title', getPresignedUrl);

module.exports = router;
