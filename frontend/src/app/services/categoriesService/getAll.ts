import { httpClient } from "../httpClient";
import { Category } from "@app/entities/Category";

type CategoriesResponse = Array<Category>;

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>("/categories");

  return data;
}
