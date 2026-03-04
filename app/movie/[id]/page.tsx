import { fetchMovieById } from "@/lib/omdb";
import MovieDetails from "@/components/MovieDetails";
import type { Movie } from "@/types/movie";
import { fetchMovieReviews } from "@/lib/reviews";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const movie: Movie = await fetchMovieById(id);
  const reviews = await fetchMovieReviews(movie.Title);

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
    </div>
  );
}
