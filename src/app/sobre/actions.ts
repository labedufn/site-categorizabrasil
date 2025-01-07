"use server";

import { getAboutPageContent } from "@/domain/services/aboutPageService";

export async function getAboutPageAction() {
  const data = await getAboutPageContent();
  return data;
}
