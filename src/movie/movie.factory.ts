import { Movie } from "@prisma/client";

export default class MovieFactory {
  static new(
    title: string = 'Movie',
    isActive: boolean = true,
  ): Movie {
    return {
      id: '00000-00000-00000-0000A1',
      title,
      isActive,
      synopsis: 'Lorem ipsum',
      releaseYear: 2020,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: null,
    };
  }

  static list(length: number = 3) {
    return Array(length).fill(MovieFactory.new());
  }
}
