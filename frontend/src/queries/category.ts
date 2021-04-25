import { Category } from "../interfaces/category";
import { httpGet, httpPost } from "./util";
import { IntoCategories } from "../transformers/category.transformer";

export async function fetchCategories(): Promise<Category[]> {
  let result = await httpGet('/categories');
  return IntoCategories(result);
}

export async function createCategory(data: any) {
  return httpPost('/categories', data);
}