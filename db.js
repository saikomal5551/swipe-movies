const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Set the MongoDB URI with additional options
const mongoURI = "mongodb://127.0.0.1:27017/swipe_movies?retryWrites=true&w=majority&connectTimeoutMS=30000";

// Log the MongoDB URI to check if it's being loaded correctly
console.log("MongoDB URI:", mongoURI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
