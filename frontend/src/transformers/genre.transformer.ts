import { Genre } from "../interfaces/genre";
import { toDate, intoArrayOf } from "./util";

export function IntoGenre(data: any): Genre {
  return {
    id: data?.id,
    name: data?.name,
    isActive: data?.isActive,
    createdAt: toDate(data?.createdAt),
    updatedAt: toDate(data?.updatedAt),
  }
}

export const IntoGenres = intoArrayOf<Genre>(IntoGenre);
