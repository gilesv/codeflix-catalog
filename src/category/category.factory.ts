import { Category } from "@prisma/client";

export default class CategoryFactory {
  static new(
    name: string = 'Category',
    description: string = 'Great movies',
    isActive: boolean = true,
  ): Category {
    return {
      id: '00000-00000-00000-0000A1',
      name,
      description,
      isActive,
      createdAt: new Date(),
      updatedAt: null,
    };
  }

  static list(length: number = 3) {
    return Array(length).fill(CategoryFactory.new());
  }
}
