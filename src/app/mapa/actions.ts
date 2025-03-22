"use server";

import { getGeoreferencingPageContent } from "@/domain/services/georeferencingPageService";

export async function getGeoreferencingPageAction() {
  const data = await getGeoreferencingPageContent();
  return data;
}
