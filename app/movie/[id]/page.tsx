// path: app/movie/[id]/page.tsx

import { fetchMovieById } from "@/lib/omdb";
import { fetchMovieReviews } from "@/lib/reviews";
import { analyzeSentiment } from "@/lib/ai";
import MovieDetails from "@/components/MovieDetails";
import type { Movie, Review, Sentiment } from "@/types/movie";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  // Fetch movie data
  const movie: Movie | null = await fetchMovieById(id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-slate-400">
            The movie with ID &quot;{id}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Fetch reviews
  const rawReviews = await fetchMovieReviews(movie.Title, movie.Year);
  const reviews: Review[] = rawReviews.map((r: any) => ({
    author: r.author || "Anonymous",
    content: r.content || "",
  }));

  // Analyze sentiment
  let sentiment: Sentiment = {
    sentiment: "No Reviews",
    summary: "No audience reviews found for this movie.",
  };

  if (reviews.length > 0) {
    const reviewTexts = reviews
      .slice(0, 5)
      .map((r) => r.content)
      .filter((content) => content && content.trim().length > 0);

    if (reviewTexts.length > 0) {
      sentiment = await analyzeSentiment(reviewTexts);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10 flex justify-center">
      <MovieDetails movie={movie} sentiment={sentiment} reviews={reviews} />
    </div>
  );
}
