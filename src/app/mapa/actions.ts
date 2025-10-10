"use server";

import { getGeoreferencingPoints } from "@/server/features/georeferencing";

export async function getGeoreferencingPageAction() {
  return getGeoreferencingPoints();
}
