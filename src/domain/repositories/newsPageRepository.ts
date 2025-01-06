import { apiGet } from "@/infrastructure/http/externalApiClient";

interface imagensNoticia {
  imagens: string;
}

interface NewsPageItem {
  date_updated: string;
  titulo: string;
  imagem_principal: string;
  texto: string;
  slug: string;
  imagens_noticia: {
    imagens_noticia_id: imagensNoticia;
  }[];
}

interface NewsPageData {
  data: NewsPageItem[];
}

export async function fetchNewsPageData(): Promise<NewsPageData> {
  const endpoint =
    "/items/noticias?filter[status][_eq]=publicado&sort=-date_created&fields=*,imagens_noticia.imagens_noticia_id.imagens";
  return apiGet<NewsPageData>(endpoint);
}
