import { buildCmsAssetUrl } from "../../cms/assetUrl";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { homeFallback } from "../../fallback/home";
import { HomeCmsResponse, homeCmsResponseSchema } from "./home.schema";
import { HomePageContent } from "./home.types";

const HOME_ENDPOINT =
  "/items/pagina_inicial?fields=*,logos_software.logos_software_id.logo,opiniao_consumidor.opiniao_consumidor_id.nome,opinia" +
  "o_consumidor.opiniao_consumidor_id.descricao,faq.faq_id.pergunta,faq.faq_id.resposta";

function mapFromCms(data: HomeCmsResponse): HomePageContent {
  const logos = data.data.logos_software.map((item) => ({
    imgSrc: buildCmsAssetUrl(item.logos_software_id.logo),
  }));

  const reviews = data.data.opiniao_consumidor.map((item) => ({
    name: item.opiniao_consumidor_id.nome,
    body: item.opiniao_consumidor_id.descricao,
  }));

  const faq = data.data.faq.map((item) => ({
    title: item.faq_id.pergunta,
    content: item.faq_id.resposta,
  }));

  return {
    instagram: data.data.instagram,
    whatsapp: data.data.whatsapp,
    youtubeChannel: data.data.canal_youtube,
    youtubeVideoLink: data.data.link_video_youtube,
    logos,
    reviews,
    faq,
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const response = await fetchCmsData<unknown>(HOME_ENDPOINT);

  console.log("Fetched home page data:", response);

  if (!response) {
    return homeFallback;
  }

  const parsed = homeCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload da página inicial:", parsed.error.flatten());
    return homeFallback;
  }

  console.log(homeFallback);

  const content = mapFromCms(parsed.data);

  return {
    ...homeFallback,
    ...content,
  };
}
