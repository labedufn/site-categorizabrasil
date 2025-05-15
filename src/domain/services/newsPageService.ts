import { formatDate } from "@/lib/formatDate";
import { normalizeMarkdown } from "@/lib/normalizeMarkdown";
import { apiGet } from "@/infrastructure/http/externalApiClient";

export interface NewsPageContent {
  criadoEm: string;
  titulo: string;
  imagemPrincipal: string;
  texto: string;
  slug: string;
  imagensNoticia: { imgSrc: string }[];
}

export interface NewsItem {
  date_created: string;
  titulo: string;
  texto: string;
  slug: string;
  imagem_principal?: {
    id: string;
    type: string;
  };
  imagens_noticia: {
    imagens_noticia_id: {
      imagens: string;
    };
  }[];
}

/** Carrega e normaliza as notícias públicas */
export async function getNewsPageContent(): Promise<NewsPageContent[]> {
  const endpoint =
    "/items/noticias" +
    "?filter[status][_eq]=publicado" +
    "&sort=-date_created" +
    "&fields=*,imagens_noticia.imagens_noticia_id.imagens,imagem_principal.type,imagem_principal.id";

  const { data } = await apiGet<{ data: NewsItem[] }>(endpoint);

  return data.map((item) => {
    const imagemPrincipal = item.imagem_principal
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${item.imagem_principal.id}.${item.imagem_principal.type.split("/").pop()}`
      : "";

    const imagensNoticia = item.imagens_noticia.map(({ imagens_noticia_id }) => ({
      imgSrc: `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${imagens_noticia_id.imagens}.svg`,
    }));

    return {
      criadoEm: formatDate(item.date_created),
      titulo: item.titulo,
      imagemPrincipal,
      texto: normalizeMarkdown(item.texto),
      slug: item.slug,
      imagensNoticia,
    };
  });
}
