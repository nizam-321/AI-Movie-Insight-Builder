//path: components/MovieDetails.tsx
import Image from "next/image";
import type { Movie } from "@/types/movie";

interface Props {
  movie: Movie | null;
}

export default function MovieDetails({ movie }: Props) {
  if (!movie) return null;

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg max-w-md">
      {posterSrc ? (
        <Image
          src={posterSrc}
          alt={movie.Title || "Movie Poster"}
          width={300}
          height={450}
          className="w-full rounded-md mb-4"
        />
      ) : (
        <div className="w-[300px] h-[450px] bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-4">
          No Poster Available
        </div>
      )}

      <h2 className="text-xl font-semibold">{movie.Title}</h2>
      <p className="text-gray-400 mt-2">Year: {movie.Year}</p>
      <p className="text-yellow-400">IMDb Rating: ⭐ {movie.imdbRating}</p>
      <p className="text-gray-300 mt-4 leading-relaxed">{movie.Plot}</p>
      <p className="text-gray-400 mt-3">Cast: {movie.Actors}</p>
    </div>
  );
}