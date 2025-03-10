const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./db");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("🎬 Swipe Movies Backend is Running!");
});

// ✅ Define Movie Schema & Model
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true }
});
const Movie = mongoose.model("Movie", movieSchema);

// ✅ API Route to get all movies
app.get("/api/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error("❌ Error fetching movies:", error);
        res.status(500).json({ message: "Error fetching movies", error });
    }
});

// ✅ API Route to add a new movie
app.post("/api/movies", async (req, res) => {
    const { title, year } = req.body;
    if (!title || !year) return res.status(400).json({ message: "Title and year are required" });

    try {
        const newMovie = new Movie({ title, year });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        console.error("❌ Error adding movie:", error);
        res.status(500).json({ message: "Error adding movie", error });
    }
});

// ✅ Define Liked Movie Schema & Model
const likedMovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    runtime: { type: String },
    genre: { type: String },
    poster: { type: String },
    plot: { type: String },
    likedBy: { type: String, required: true } // Store user identifier
}, { timestamps: true });

const LikedMovie = mongoose.model("LikedMovie", likedMovieSchema);

// ✅ API Route to save a liked movie
app.post("/api/movies/like", async (req, res) => {
    const { title, year, runtime, genre, poster, plot, likedBy } = req.body;
    
    if (!title || !year || !likedBy) {
        return res.status(400).json({ message: "Title, year, and likedBy are required" });
    }

    try {
        // 🔍 Check if the movie is already liked by the user
        const existingLike = await LikedMovie.findOne({ title, likedBy });
        if (existingLike) {
            return res.status(400).json({ message: "You have already liked this movie" });
        }

        if (existingLike) {
            return res.status(400).json({ message: "You have already liked this movie" });
        }


        if (existingLike) {
            return res.status(400).json({ message: "You have already liked this movie" });
        }

        console.log(`Movie liked: ${title}, liked by: ${likedBy}`); // Log the liked movie details
        const likedMovie = new LikedMovie({ title, year, runtime, genre, poster, plot, likedBy });

        await likedMovie.save();
        res.status(201).json({ message: "✅ Movie liked successfully", likedMovie });
    } catch (error) {
        console.error("❌ Error saving liked movie:", error);
        res.status(500).json({ message: "Error saving liked movie", error });
    }
});

// ✅ API Route to fetch all liked movies
app.get("/api/movies/liked", async (req, res) => {
    try {
        const likedMovies = await LikedMovie.find();
        res.json(likedMovies);
    } catch (error) {
        console.error("❌ Error fetching liked movies:", error);
        res.status(500).json({ message: "Error fetching liked movies", error });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
