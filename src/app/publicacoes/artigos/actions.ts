"use server";

import { getArticlesPageContent } from "@/domain/services/articlesPageService";

export async function getArticlesPageAction() {
  const data = await getArticlesPageContent();
  return data;
}
