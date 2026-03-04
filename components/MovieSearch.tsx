"use client";

import { useState } from "react";
import { fetchMovieById } from "@/lib/omdb";
import Image from "next/image";

export default function MovieSearch() {
  const [movieId, setMovieId] = useState<string>("");
  const [movie, setMovie] = useState<any>(null);

  const handleSearch = async () => {
    if (!movieId) {
      alert("Please enter IMDb ID");
      return;
    }

    try {
      const data = await fetchMovieById(movieId);

      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
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
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
      >
        Analyze Movie
      </button>
      {movie && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
            className="w-full rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold">{movie.Title}</h2>
          <p className="text-gray-400 mt-2">Year: {movie.Year}</p>
          <p className="text-yellow-400">IMDb Rating: ⭐ {movie.imdbRating}</p>
          <p className="text-gray-300 mt-4 leading-relaxed">{movie.Plot}</p>
          <p className="text-gray-400 mt-3">Cast: {movie.Actors}</p>
        </div>
      )}
    </div>
  );
}
