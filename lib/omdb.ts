//path: lib/omdb.ts
import axios from "axios";
import type { Movie } from "@/types/movie";

const API_KEY = process.env.OMDB_API_KEY;

export const fetchMovieById = async (imdbId: string): Promise<Movie | null> => {
  if (!API_KEY) {
    console.error("OMDB_API_KEY is not configured");
    return null;
  }

  if (!imdbId || !imdbId.trim()) {
    console.error("Invalid IMDb ID provided");
    return null;
  }

  try {
    const response = await axios.get<Movie>("https://www.omdbapi.com/", {
      params: {
        apikey: API_KEY,
        i: imdbId.trim(),
        plot: "full",
      },
    });

    const data = response.data;

    if (data.Response === "False" || data.Error) {
      console.error("Movie not found:", data.Error);
      return null;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching movie from OMDB:", error.message || error);
    return null;
  }
};
