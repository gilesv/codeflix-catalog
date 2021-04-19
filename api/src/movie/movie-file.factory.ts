import { MovieFile } from "@prisma/client";

export default class MovieFileFactory {
  static new(name: string = 'movie.mp4'): MovieFile {
    return {
      id: '00000-00000-00000-0000A1',
      name,
      kind: 'abc123',
      url: '/abc/123',
      movieId: '00000-00000-00000-0000A1',
      createdAt: new Date(),
      updatedAt: null,
      version: 1,
    };
  }

  static list(length: number = 3) {
    return Array(length).fill(MovieFileFactory.new());
  }
}
