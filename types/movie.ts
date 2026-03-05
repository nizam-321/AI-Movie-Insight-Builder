//path: types/movie.ts
export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  imdbVotes: string;
  Actors: string;
  Director: string;
  Runtime: string;
  Type: string;
  Rated: string;
  imdbID: string;
  Response?: string;
  Error?: string;
}

export interface Sentiment {
  sentiment: string;
  summary: string;
}

export interface Review {
  author: string;
  content: string;
}

export interface MovieInsight {
  movie: Movie;
  sentiment: Sentiment;
  reviews: Review[];
}
