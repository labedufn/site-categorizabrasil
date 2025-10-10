"use server";

import { getArticles } from "@/server/features/articles";

export async function getArticlesPageAction() {
  return getArticles();
}
