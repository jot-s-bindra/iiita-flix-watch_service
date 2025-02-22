// controllers/watchController.js
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const Video = require('../models/Video'); // MongoDB Video model
const s3Client = require('../config/awsConfig'); // S3 client

// ✅ Function to Generate Pre-signed URL
const getPresignedUrl = async (req, res) => {
    const { userId, title } = req.params;

    try {
        // ✅ Check if video exists in MongoDB with status 'done'
        const video = await Video.findOne({ userId, title, status: 'done' });

        if (!video) {
            return res.status(404).json({ error: 'Video not found or not ready' });
        }

        // ✅ Generate S3 Pre-signed URL
        const key = `${userId}/${title}/index.m3u8`;
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        res.json({ presignedUrl });

    } catch (error) {
        console.error('❌ Error generating pre-signed URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getPresignedUrl };
