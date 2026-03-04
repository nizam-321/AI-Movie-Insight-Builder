"use client";

import { useState } from "react";
import { fetchMovieById } from "@/lib/omdb";

import type { Movie } from "@/types/movie";
import MovieDetails from "@/components/MovieDetails";

export default function MovieSearch() {
  const [movieId, setMovieId] = useState<string>("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!movieId) {
      alert("Please enter IMDb ID");
      return;
    }

      setError(null);
      setLoading(true);
      const data = await fetchMovieById(movieId);
      if (!data) {
        setError("Failed to fetch movie data. Please check IMDb ID.");
        setMovie(null);
        setLoading(false);
        return;
      }
      setMovie(data);
      setLoading(false);
  };
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Enter IMDb ID (e.g. tt0133093)"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
      >
        {loading ? "Loading..." : "Analyze Movie"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {movie && !error && <MovieDetails movie={movie} />}
    </div>
  );
}
