import { Movie } from "../interfaces/movie";
import { IntoMovie, IntoMovies } from "../transformers/movie.transformer";
import { httpGet, httpPatch, httpPost } from "./util";

export async function fetchMovie(id: string): Promise<Movie> {
  let result = await httpGet(`/movies/${id}`);
  return IntoMovie(result);
}

export async function fetchMovies(): Promise<Movie[]> {
  let result = await httpGet('/movies');
  return IntoMovies(result);
}

export async function createMovie(data: any) {
  return httpPost('/movies', data);
}

export async function updateMovie(movie: Movie) {
  return httpPatch(`/movies/${movie.id}`, movie);
}
