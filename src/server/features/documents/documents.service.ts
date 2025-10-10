import { formatDate } from "@/lib/formatDate";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { documentsFallback } from "../../fallback/documents";
import { documentsCmsResponseSchema } from "./documents.schema";
import { DocumentItem } from "./documents.types";

const DOCUMENTS_ENDPOINT = "/items/documentos_uteis";

export async function getDocuments(): Promise<DocumentItem[]> {
  const response = await fetchCmsData<unknown>(DOCUMENTS_ENDPOINT);

  if (!response) {
    return documentsFallback;
  }

  const parsed = documentsCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload de documentos úteis:", parsed.error.flatten());
    return documentsFallback;
  }

  const items = parsed.data.data.map<DocumentItem>((item) => ({
    title: item.titulo_documento,
    url: item.link_documento,
    date: formatDate(item.date_created),
  }));

  if (!items.length) {
    return documentsFallback;
  }

  return items;
}
