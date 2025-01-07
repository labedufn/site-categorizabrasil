"use server";

import { getEnglishPageContent } from "@/domain/services/englishPageService";

export async function getEnglishPageAction() {
  const data = await getEnglishPageContent();
  return data;
}
