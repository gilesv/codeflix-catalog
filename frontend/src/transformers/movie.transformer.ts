import { Movie } from "../interfaces/movie";
import { toNumber, toDate } from "./util";

export function IntoMovies(data: any[]): Movie[] {
  if (Array.isArray(data)) {
    let movies: Movie[] = [];
    for (let movie of data) {
      if (typeof movie === "object") {
        movies.push(IntoMovie(movie));
      }
    }
    return movies;
  }
  return [];
}

export function IntoMovie(data: any): Movie {
  return {
    id: data?.id,
    title: data?.title,
    synopsis: data?.synopsis,
    releaseYear: toNumber(data?.releaseYear),
    isAvailable: data?.isAvailable,
    isActive: data?.isActive,
    createdAt: toDate(data?.createdAt),
    updatedAt: toDate(data?.updatedAt),
  }
}