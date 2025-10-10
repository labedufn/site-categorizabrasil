import { formatDate } from "@/lib/formatDate";
import { normalizeMarkdown } from "@/lib/normalizeMarkdown";
import { buildCmsAssetUrl } from "../../cms/assetUrl";
import { extensionFromMime } from "../../cms/mime";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { newsFallback } from "../../fallback/news";
import { newsCmsResponseSchema } from "./news.schema";
import { NewsArticle } from "./news.types";

const NEWS_ENDPOINT =
  "/items/noticias?filter[status][_eq]=publicado&sort=-date_created&fields=*,imagens_noticia.imagens_noticia_id.imagens,imagem_principal.type,imagem_principal.id";

export async function getNews(): Promise<NewsArticle[]> {
  const response = await fetchCmsData<unknown>(NEWS_ENDPOINT);

  if (!response) {
    return newsFallback;
  }

  const parsed = newsCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload de notícias:", parsed.error.flatten());
    return newsFallback;
  }

  const articles = parsed.data.data.map<NewsArticle>((item) => {
    const heroExt = extensionFromMime(item.imagem_principal?.type) ?? "jpg";
    const heroImage = item.imagem_principal ? buildCmsAssetUrl(item.imagem_principal.id, heroExt) : "";
    const gallery = item.imagens_noticia.map((galleryItem) => ({
      imgSrc: buildCmsAssetUrl(galleryItem.imagens_noticia_id.imagens, "svg"),
    }));

    return {
      slug: item.slug,
      title: item.titulo,
      body: normalizeMarkdown(item.texto),
      heroImage,
      gallery,
      publishedAt: item.date_created,
      publishedAtLabel: formatDate(item.date_created),
    };
  });

  if (!articles.length) {
    return newsFallback;
  }

  return articles;
}
