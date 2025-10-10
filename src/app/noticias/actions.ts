"use server";

import { getNews } from "@/server/features/news";

export async function getNewsPageAction() {
  return getNews();
}
