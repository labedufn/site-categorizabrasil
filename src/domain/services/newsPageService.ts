import { formatDate } from "@/lib/formatDate";
import { fetchNewsPageData } from "../repositories/newsPageRepository";
import { normalizeMarkdown } from "@/lib/normalizeMarkdown";

export interface NewsPageContent {
  criadoEm: string;
  titulo: string;
  imagemPrincipal: string;
  texto: string;
  slug: string;
  imagensNoticia: { imgSrc: string }[];
}

export async function getNewsPageContent(): Promise<NewsPageContent[]> {
  const { data } = await fetchNewsPageData();

  const newsPageContent = data.map((item) => {
    const imagemPrincipal = item.imagem_principal
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${item.imagem_principal.id}.${item.imagem_principal.type}`
      : "";

    const imagensNoticia = item.imagens_noticia.map((imagensNoticia) => {
      return {
        imgSrc: `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${imagensNoticia.imagens_noticia_id.imagens}`,
      };
    });

    return {
      criadoEm: formatDate(item.date_created),
      titulo: item.titulo,
      imagemPrincipal,
      texto: normalizeMarkdown(item.texto),
      slug: item.slug,
      imagensNoticia,
    };
  });

  return newsPageContent;
}
