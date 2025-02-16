const mongoose = require('mongoose');
const URL = process.env.MONGO_DB_URL;

const connectDb = async() => {
    try {
        if (!URL) {
            throw new Error('MONGO_DB_URL is not defined in environment variables');
        }

        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4  // Force IPv4
        });
        console.log("Connection to DB was successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        console.error("Full error:", error);
        process.exit(1);
    }
};

module.exports = connectDb;