import axios from "axios"

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export const fetchMovieReviews = async (movieTitle: string) => {

  try{

    // search movie in TMDB
    const searchRes = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params:{
          api_key: TMDB_API_KEY,
          query: movieTitle
        }
      }
    )

    const movieId = searchRes.data.results[0]?.id

    if(!movieId) return []

    // fetch reviews
    const reviewRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
      {
        params:{
          api_key: TMDB_API_KEY
        }
      }
    )

    return reviewRes.data.results

  }catch(error){

    console.error("Error fetching reviews:",error)

    return []

  }

}