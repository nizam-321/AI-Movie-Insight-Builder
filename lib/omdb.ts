import axios from "axios"

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY

export const fetchMovieById = async (imdbId: string) => {

  try {

    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        apikey: API_KEY,
        i: imdbId
      }
    })

    return response.data

  } catch (error) {
    console.error("Error fetching movie:", error)
    throw new Error("Failed to fetch movie data")
  }

}