const express = require('express');
const cors = require('cors'); // ✅ Import CORS
const connectDB = require('./config/mongoConfig');
const watchRoute = require('./routes/watchRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Enable CORS Middleware
app.use(cors({
    origin: '*', // 🌎 Allow All Domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Routes
app.use(watchRoute);

app.listen(PORT, () => {
    console.log(`🚀 Watch Service is running on port ${PORT}`);
});
