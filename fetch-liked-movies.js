const mongoose = require('mongoose');
const LikedMovie = require('./models/likedmovie');

async function fetchLikedMovies() {
    try {
        const likedMovies = await LikedMovie.find();
        console.log("Liked Movies:", likedMovies);
    } catch (error) {
        console.error("Error fetching liked movies:", error);
    }
}

fetchLikedMovies();
