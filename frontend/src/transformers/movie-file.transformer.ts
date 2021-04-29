import { MovieFile } from "../interfaces/movie-file";
import { toNumber, toDate, intoArrayOf } from "./util";

export function IntoMovieFile(data: any): MovieFile {
  return {
    id: data?.id,
    name: data?.name,
    kind: data?.kind,
    url: data?.url,
    movieId: data?.movieId,
    createdAt: toDate(data?.createdAt),
    updatedAt: toDate(data?.updatedAt),
    version: toNumber(data?.version),
  }
}

export const IntoMovieFiles = intoArrayOf<MovieFile>(IntoMovieFile);
