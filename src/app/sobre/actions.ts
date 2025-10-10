"use server";

import { getAboutPageContent } from "@/server/features/about";

export async function getAboutPageAction() {
  return getAboutPageContent();
}
