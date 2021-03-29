import { Genre } from "@prisma/client";

export default class GenreFactory {
  static new(name: string = 'Genre', isActive: boolean = true): Genre {
    return {
      id: 'ABCD-0000-1111-2222',
      name,
      isActive,
      createdAt: new Date(),
      updatedAt: null,
    };
  }

  static list(length = 3): Genre[] {
    return Array(length).fill(GenreFactory.new());
  }
}
