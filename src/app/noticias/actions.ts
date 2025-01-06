"use server";

import { getNewsPageContent } from "@/domain/services/newsPageService";

export async function getNewsPageAction() {
  const data = await getNewsPageContent();
  return data;
}
