import { Movie } from "../interfaces/movie";
import { toNumber, toDate, intoArrayOf } from "./util";

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
    categories: [],
    genres: [],
    castMembers: [],
  }
}

export const IntoMovies = intoArrayOf<Movie>(IntoMovie);
