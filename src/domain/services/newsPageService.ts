import { formatDate } from "@/lib/formatDate";
import { fetchNewsPageData } from "../repositories/newsPageRepository";
import { normalizeMarkdown } from "@/lib/normalizeMarkdown";

export interface ImagensNoticia {
  imgSrc: string;
}

export interface NewsPageContent {
  criadoEm: string;
  titulo: string;
  imagemPrincipal: string;
  texto: string;
  slug: string;
  imagensNoticia: ImagensNoticia[];
}

export async function getNewsPageContent(): Promise<NewsPageContent[]> {
  const { data } = await fetchNewsPageData();

  const newsPageContent = data.map((item) => {
    const imagemPrincipal = item.imagem_principal
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${item.imagem_principal}.svg`
      : "";

    const imagensNoticia = item.imagens_noticia.map((imagensNoticia) => {
      return {
        imgSrc: `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${imagensNoticia.imagens_noticia_id.imagens}.svg`,
      };
    });

    return {
      criadoEm: formatDate(item.date_updated),
      titulo: item.titulo,
      imagemPrincipal: imagemPrincipal,
      texto: normalizeMarkdown(item.texto),
      slug: item.slug,
      imagensNoticia,
    };
  });

  return newsPageContent;
}
