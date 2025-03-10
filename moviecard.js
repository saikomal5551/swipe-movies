import React from "react";
import "./MovieCard.css"; // Make sure MovieCard.css exists

const MovieCard = ({ movie, onLike }) => {
  return (
    <div className="movie-card">
      <img className="movie-poster" src={movie.poster || "https://via.placeholder.com/200x300"} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>Year: {movie.year}</p>
        <button onClick={() => onLike(movie)}>❤️ Like</button>
      </div>
    </div>
  );
};

export default MovieCard;
