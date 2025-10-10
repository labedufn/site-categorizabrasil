"use server";

import { getDocuments } from "@/server/features/documents";

export async function getDocumentsPageAction() {
  return getDocuments();
}
