import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleLike = (movie) => {
    fetch("http://localhost:5000/movies/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => console.log("Movie liked:", data))
      .catch((error) => console.error("Error liking movie:", error));
  };

  return (
    <div className="App">
      <h1>🎬 Swipe Movies</h1>
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onLike={handleLike} />
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default App;
