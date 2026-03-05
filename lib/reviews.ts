//path: lib/reviews.ts
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface TMDBSearchResult {
  results?: Array<{ id: number }>;
}

interface TMDBReviewResult {
  results?: Array<{
    author: string;
    content: string;
  }>;
}

export const fetchMovieReviews = async (
  movieTitle: string,
  year?: string
): Promise<Array<{ author: string; content: string }>> => {
  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is not configured");
    return [];
  }

  if (!movieTitle || !movieTitle.trim()) {
    console.error("Invalid movie title provided");
    return [];
  }

  try {
    // Extract year from range if present (e.g., "2020–2021" -> "2020")
    const yearParam = year ? `&year=${year.split("–")[0].split("-")[0].trim()}` : "";
    
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle.trim())}${yearParam}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!searchRes.ok) {
      console.error(`TMDB search failed with status: ${searchRes.status}`);
      return [];
    }

    const searchData: TMDBSearchResult = await searchRes.json();
    const movieId = searchData?.results?.[0]?.id;

    if (!movieId) {
      console.log("No movie found on TMDB for:", movieTitle);
      return [];
    }

    const reviewRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!reviewRes.ok) {
      console.error(`TMDB reviews fetch failed with status: ${reviewRes.status}`);
      return [];
    }

    const reviewData: TMDBReviewResult = await reviewRes.json();
    return reviewData?.results || [];
  } catch (error: unknown) {
    console.error("TMDB fetch error:", error instanceof Error ? error.message : error);
    return [];
  }
};
