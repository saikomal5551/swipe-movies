const mongoose = require('mongoose');

const likedMovieSchema = new mongoose.Schema({
    title: String,
    year: String,
    runtime: String,
    genre: String,
    poster: String,
    plot: String,
    likedBy: String // Added field to track who liked the movie
});


module.exports = mongoose.model('LikedMovie', likedMovieSchema);
