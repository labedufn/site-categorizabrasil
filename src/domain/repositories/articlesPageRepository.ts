import { apiGet } from "@/infrastructure/http/externalApiClient";

interface ArticlesPageItem {
  data_publicacao: string;
  titulo: string;
  resumo: string;
  autores: string[];
  link: string;
}

interface ArticlesPageData {
  data: ArticlesPageItem[];
}

export async function fetchArticlesPageData(): Promise<ArticlesPageData> {
  const endpoint = "/items/artigos_publicacoes";
  return apiGet<ArticlesPageData>(endpoint);
}
