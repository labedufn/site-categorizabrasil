import { apiGet } from "@/infrastructure/http/externalApiClient";

interface ImagemPrincipal {
  id: string;
  type: string;
}

interface ImagensNoticia {
  imagens: string;
}

interface NewsPageItem {
  date_created: string;
  titulo: string;
  imagem_principal: ImagemPrincipal;
  texto: string;
  slug: string;
  imagens_noticia: {
    imagens_noticia_id: ImagensNoticia;
  }[];
}

interface NewsPageData {
  data: NewsPageItem[];
}

export async function fetchNewsPageData(): Promise<NewsPageData> {
  const endpoint =
    "/items/noticias?filter[status][_eq]=publicado&sort=-date_created&fields=*,imagens_noticia.imagens_noticia_id.imagens,imagem_principal.type,imagem_principal.id";
  return apiGet<NewsPageData>(endpoint);
}
