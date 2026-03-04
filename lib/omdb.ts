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

    const data =  response.data;

    if (data.Response === "False") {
        return null;
    }
    return data

  } catch (error: any) {
    console.error("Error fetching movie:", error)
    return null;
  }

}