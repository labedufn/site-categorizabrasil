import { formatDate } from "@/lib/formatDate";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { articlesFallback } from "../../fallback/articles";
import { articlesCmsResponseSchema } from "./articles.schema";
import { ArticleItem } from "./articles.types";

const ARTICLES_ENDPOINT = "/items/artigos_publicacoes";

export async function getArticles(): Promise<ArticleItem[]> {
  const response = await fetchCmsData<unknown>(ARTICLES_ENDPOINT);

  if (!response) {
    return articlesFallback;
  }

  const parsed = articlesCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload de artigos:", parsed.error.flatten());
    return articlesFallback;
  }

  const items = parsed.data.data.map<ArticleItem>((item) => ({
    title: item.titulo,
    resume: item.resumo,
    authors: item.autores,
    date: formatDate(item.data_publicacao),
    url: item.link,
  }));

  if (!items.length) {
    return articlesFallback;
  }

  return items;
}
