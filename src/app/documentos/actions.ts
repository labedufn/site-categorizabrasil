"use server";

import { getDocumentsPageContent } from "@/domain/services/documentsPageService";

export async function getDocumentsPageAction() {
  const data = await getDocumentsPageContent();
  return data;
}
