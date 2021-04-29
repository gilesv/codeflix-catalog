import { MovieFile } from "./movie-file";

export interface Movie {
  id: string,
  title: string,
  synopsis: string,
  releaseYear: number|null,
  isAvailable: boolean,
  isActive: boolean,
  createdAt: Date|null,
  updatedAt: Date|null,
  categories: any[],
  genres: any[],
  castMembers: any[]
  files: MovieFile[]
}
