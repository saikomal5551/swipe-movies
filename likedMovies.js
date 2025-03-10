const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const LikedMovie = require("../models/likedmovie");
const Movie = mongoose.model("LikedMovie", new mongoose.Schema({

  title: String,
  year: String,
  runtime: String,
  genre: String,
  poster: String,
  plot: String
}));

// POST route for liking movies
router.post("/movies/like", async (req, res) => {
  try {
    const movie = new LikedMovie(req.body);

    await movie.save();
    res.status(201).json({ message: "Movie liked successfully", movie });
  } catch (error) {
    console.error('Error while liking movie:', error.message); // Log the error for debugging
    res.status(500).json({ error: error.message });

  }
});

router.get("/movies/liked", async (req, res) => {
  try {
    const likedMovies = await LikedMovie.find();
    res.status(200).json(likedMovies);
  } catch (error) {
    console.error('Error while fetching liked movies:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
