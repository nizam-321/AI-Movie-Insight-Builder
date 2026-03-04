//path: lib/reviews.ts
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const fetchMovieReviews = async (movieTitle: string) => {
  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`
    );

    const searchData = await searchRes.json();
    const movieId = searchData?.results?.[0]?.id;

    if (!movieId) return [];

    const reviewRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`
    );

    const reviewData = await reviewRes.json();
    return reviewData?.results || [];
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return [];
  }
};