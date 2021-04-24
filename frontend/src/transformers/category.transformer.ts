import { Category } from "../interfaces/category";
import { toDate, intoArrayOf } from "./util";

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

export const IntoCategories = intoArrayOf<Category>(IntoCategory);
