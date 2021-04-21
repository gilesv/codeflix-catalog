import { Movie } from "../interfaces/movie";
import { IntoMovies } from "../transformers/movie.transformer";
import { httpGet } from "./util";

export async function fetchMovies(): Promise<Movie[]> {
  let result = await httpGet('/movies');
  return IntoMovies(result);
}
