const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.DB_URL;
    if (!uri) throw new Error("DB_URL is not defined in environment variables");

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
};

const disconnectDB = async () => {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
};

module.exports = { connectDB, disconnectDB };
