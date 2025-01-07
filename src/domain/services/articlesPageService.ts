import { convertData } from "@/lib/convertDate";
import { fetchArticlesPageData } from "../repositories/articlesPageRepository";

export interface ArticlesPageContent {
  title: string;
  resume: string;
  authors: string[];
  date: string;
  url: string;
}

export async function getArticlesPageContent(): Promise<ArticlesPageContent[]> {
  const { data } = await fetchArticlesPageData();

  const articlesPageContent = data.map((item) => {
    return {
      title: item.titulo,
      resume: item.resumo,
      authors: item.autores,
      date: convertData(item.data_publicacao),
      url: item.link,
    };
  });

  return articlesPageContent;
}
