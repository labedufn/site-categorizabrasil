import { formatDate } from "@/lib/formatDate";
import { fetchDocumentsPageData } from "../repositories/documentsPageRepository";

export interface DocumentsPageContent {
  title: string;
  url: string;
  date: string;
}

export async function getDocumentsPageContent(): Promise<DocumentsPageContent[]> {
  const { data } = await fetchDocumentsPageData();

  const documentsPageContent = data.map((item) => {
    return {
      title: item.titulo_documento,
      url: item.link_documento,
      date: formatDate(item.date_created),
    };
  });

  return documentsPageContent;
}
