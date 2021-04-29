export interface MovieFile {
  id: string
  name: string
  kind: string
  url: string
  movieId: string
  createdAt: Date | null
  updatedAt: Date | null
  version: number | null
}
