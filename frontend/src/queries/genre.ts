import { Genre } from "../interfaces/genre";
import { IntoGenres } from "../transformers/genre.transformer";
import { httpGet } from "./util";

export async function fetchGenres(): Promise<Genre[]> {
  let result = await httpGet('/genres');
  return IntoGenres(result);
}
