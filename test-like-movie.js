const axios = require('axios');

const movieData = {
    title: "The Matrix", // Keeping the same movie title
    year: "1999",
    runtime: "136 min",
    genre: "Action",
    poster: "https://example.com/matrix.jpg",
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    likedBy: "user456" // Changed user identifier
};

axios.post('http://localhost:5000/api/movies/like', movieData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
