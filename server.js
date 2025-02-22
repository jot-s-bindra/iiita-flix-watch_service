// server.js
const express = require('express');
const connectDB = require('./config/mongoConfig');
const watchRoute = require('./routes/watchRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use(watchRoute);

app.listen(PORT, () => {
    console.log(`🚀 Watch Service is running on port ${PORT}`);
});
