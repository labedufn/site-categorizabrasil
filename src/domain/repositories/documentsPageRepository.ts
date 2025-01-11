import { apiGet } from "@/infrastructure/http/externalApiClient";

interface DocumentsPageItem {
  titulo_documento: string;
  link_documento: string;
  date_created: string;
}

interface DocumentsPageData {
  data: DocumentsPageItem[];
}

export async function fetchDocumentsPageData(): Promise<DocumentsPageData> {
  const endpoint = "/items/documentos_uteis";
  return apiGet<DocumentsPageData>(endpoint);
}
