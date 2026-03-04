import { fetchMovieById } from "@/lib/omdb"
import MovieDetails from "@/components/MovieDetails"
import type { Movie } from "@/types/movie"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function MoviePage({ params }: Props){

  const { id } = await params

  const movie: Movie = await fetchMovieById(id)

  return(

    <div className="min-h-screen flex justify-center items-center p-8">

      <MovieDetails movie={movie} />

    </div>

  )

}