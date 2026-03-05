import { fetchMovieById } from "@/lib/omdb";
import { fetchMovieReviews } from "@/lib/reviews";
import { analyzeSentiment } from "@/lib/ai";
import MovieDetails from "@/components/MovieDetails";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
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
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <AlertCircle size={40} className="text-red-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-slate-400 mb-8">
            The movie with ID &quot;{id}&quot; could not be found. Please check the IMDb ID and try again.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 transition-all font-semibold shadow-lg hover:shadow-blue-500/30"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Search</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 sm:px-6 py-10">
        <MovieDetails movie={movie} sentiment={sentiment} reviews={reviews} />
      </main>
    </div>
  );
}
