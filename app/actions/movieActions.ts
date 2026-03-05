// path: app/actions/movieActions.ts
"use server";

import { fetchMovieById } from "@/lib/omdb";
import { fetchMovieReviews } from "@/lib/reviews";
import { analyzeSentiment } from "@/lib/ai";
import type { Movie, MovieInsight, Review, Sentiment } from "@/types/movie";

interface MovieInsightResponse {
  success: boolean;
  data?: MovieInsight;
  error?: string;
}

export async function getMovieInsight(
  imdbId: string
): Promise<MovieInsightResponse> {
  // Validate input
  if (!imdbId || !imdbId.trim()) {
    return {
      success: false,
      error: "Please provide a valid IMDb ID.",
    };
  }

  const cleanImdbId = imdbId.trim();

  // Validate IMDb ID format
  if (!cleanImdbId.startsWith("tt")) {
    return {
      success: false,
      error: "Invalid IMDb ID format. IMDb IDs should start with 'tt' (e.g., tt0133093).",
    };
  }

  try {
    // 1. Fetch Movie Details from OMDB
    const movie: Movie | null = await fetchMovieById(cleanImdbId);
    
    if (!movie) {
      return {
        success: false,
        error: "Movie not found. Please verify the IMDb ID and try again.",
      };
    }

    // Check if movie data is valid
    if (movie.Response === "False" || movie.Error) {
      return {
        success: false,
        error: movie.Error || "Movie not found in OMDB database.",
      };
    }

    // 2. Fetch Reviews from TMDB (with year to improve matching)
    const rawReviews = await fetchMovieReviews(movie.Title, movie.Year);
    
    const reviews: Review[] = rawReviews.map((r: any) => ({
      author: r.author || "Anonymous",
      content: r.content || "",
    }));

    // 3. AI Sentiment Analysis (only if reviews exist)
    let sentiment: Sentiment = {
      sentiment: "No Reviews",
      summary:
        "No audience reviews found for this movie. AI analysis requires user feedback.",
    };

    if (reviews.length > 0) {
      const reviewTexts = reviews
        .map((r) => r.content)
        .filter((content) => content && content.trim().length > 0);

      if (reviewTexts.length > 0) {
        sentiment = await analyzeSentiment(reviewTexts);
      }
    }

    return {
      success: true,
      data: {
        movie,
        reviews,
        sentiment,
      },
    };
  } catch (error: any) {
    console.error("Error in getMovieInsight action:", error);

    // Handle specific error types
    if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
      return {
        success: false,
        error: "API authentication failed. Please check your API keys in environment variables.",
      };
    }

    if (error.message?.includes("429") || error.message?.includes("rate limit")) {
      return {
        success: false,
        error: "API rate limit exceeded. Please try again in a few moments.",
      };
    }

    if (error.message?.includes("timeout") || error.message?.includes("ETIMEDOUT")) {
      return {
        success: false,
        error: "Request timed out. Please check your internet connection and try again.",
      };
    }

    return {
      success: false,
      error: error.message || "An unexpected server error occurred. Please try again later.",
    };
  }
}
