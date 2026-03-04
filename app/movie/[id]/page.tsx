import { fetchMovieById } from "@/lib/omdb";
import MovieDetails from "@/components/MovieDetails";
import type { Movie } from "@/types/movie";
import { fetchMovieReviews } from "@/lib/reviews";
import { analyzeSentiment } from "@/lib/ai";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const movie: Movie = await fetchMovieById(id);
  const reviews = await fetchMovieReviews(movie.Title);
  const reviewTexts = reviews.slice(0, 5).map((r: any) => r.content);
  const sentiment = await analyzeSentiment(reviewTexts);

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <MovieDetails movie={movie} />
      <div className="mt-10 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Audience Reviews</h2>

        {reviews.slice(0, 3).map((review: any, index: number) => (
          <p key={index} className="text-gray-300 mb-3">
            {review.content}
          </p>
        ))}
      </div>
      <div className="mt-10 max-w-xl bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">AI Audience Insight</h2>

        <p className="text-gray-300 whitespace-pre-line">{sentiment}</p>
      </div>
    </div>
  );
}
