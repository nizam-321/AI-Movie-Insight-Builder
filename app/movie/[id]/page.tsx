//path: app/movie/[id]/page.tsx
import { fetchMovieById } from "@/lib/omdb";
import MovieDetails from "@/components/MovieDetails";
import type { Movie } from "@/types/movie";
import { fetchMovieReviews } from "@/lib/reviews";
import { analyzeSentiment } from "@/lib/ai";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const movie: Movie = await fetchMovieById(id);
  const reviews = await fetchMovieReviews(movie.Title);

  const reviewTexts = reviews.slice(0, 5).map((r: any) => r.content);
  const sentiment = await analyzeSentiment(reviewTexts);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 gap-8">

      <MovieDetails movie={movie} />

      {/* AI Insight */}
     <div className="max-w-xl w-full bg-gray-800 p-6 rounded-lg">
  <h2 className="text-xl font-semibold mb-3">AI Audience Insight</h2>

  {sentiment && (
    <>
      <p className="text-yellow-400 font-medium">
        Sentiment: {sentiment.sentiment}
      </p>
      <p className="text-gray-300 mt-2">
        {sentiment.summary}
      </p>
    </>
  )}
</div>

      {/* Reviews */}
      <div className="max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-4">
          Audience Reviews
        </h2>

        {reviews.slice(0, 3).map((review: any, index: number) => (
          <p key={index} className="text-gray-300 mb-3">
            {review.content}
          </p>
        ))}
      </div>

    </div>
  );
}