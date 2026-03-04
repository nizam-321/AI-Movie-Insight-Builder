import Image from "next/image"
interface Props {
  movie: any
}

export default function MovieDetails({ movie }: Props) {

  if(!movie) return null

  return (

    <div className="mt-6 p-4 bg-gray-800 rounded-lg max-w-md">

      <Image
        src={movie.Poster}
        alt={movie.Title}
        width={300}
        height={450}
        className="w-full rounded-md mb-4"
      />

      <h2 className="text-xl font-semibold">{movie.Title}</h2>

      <p className="text-gray-400 mt-2">Year: {movie.Year}</p>

      <p className="text-yellow-400">
        IMDb Rating: ⭐ {movie.imdbRating}
      </p>

      <p className="text-gray-300 mt-4 leading-relaxed">
        {movie.Plot}
      </p>

      <p className="text-gray-400 mt-3">
        Cast: {movie.Actors}
      </p>

    </div>

  )

}