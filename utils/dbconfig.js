const mongoose = require('mongoose');
const URL = "mongodb+srv://harshyadav5939:VnTmOlhn8XArIwXg@notezipper2.iurctz8.mongodb.net/?retryWrites=true&w=majority&appName=Notezipper2";

const connectDb = async() => {
    try {
        await mongoose.connect(URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4  // Force IPv4
        });
        console.log("Connection to DB was successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        // Also log the full error object
        console.error("Full error:", error);
        process.exit(1);
    }
};

module.exports = connectDb; 