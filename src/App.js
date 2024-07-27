import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./detailView";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  // const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [goToDetailView, setgoTODetailView] = useState(false);

  useEffect(() => {
    searchMovies("superman");
  }, []);

  {
    if (goToDetailView) {
      return <Navigate to="/detailView" />;
    }
  }

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>The Movie Finder</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              onClick={() => {
                setgoTODetailView = true;
              }}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
