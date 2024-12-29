"use server";

import { getHomePageContent } from "@/domain/services/homePageService";

export async function getHomePageAction() {
  const data = await getHomePageContent();
  return data;
}
