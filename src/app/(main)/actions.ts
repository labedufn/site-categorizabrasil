"use server";

import { getHomePageContent } from "@/server/features/home";

export async function getHomePageAction() {
  return getHomePageContent();
}
