"use server";

import { getEnglishPageContent } from "@/server/features/english";

export async function getEnglishPageAction() {
  return getEnglishPageContent();
}
