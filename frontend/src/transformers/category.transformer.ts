import { Category } from "../interfaces/category";
import { toDate } from "./util";

export function IntoCategories(data: any[]): Category[] {
  if (Array.isArray(data)) {
    let categories: Category[] = [];
    for (let category of data) {
      if (typeof category === "object") {
        categories.push(IntoCategory(category));
      }
    }
    return categories;
  }
  return [];
}

export function IntoCategory(data: any): Category {
  return {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    isActive: data?.isActive,
    createdAt: toDate(data?.createdAt),
    updatedAt: toDate(data?.updatedAt),
  }
}