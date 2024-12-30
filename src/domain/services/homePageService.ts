import { fetchHomePageData } from "../repositories/homePageRepository";

export interface Logo {
  imgSrc: string;
}

export interface OpiniaoConsumidor {
  nome: string;
  descricao: string;
}

export interface HomePageContent {
  instagram: string;
  whatsapp: string;
  youtubeChannel: string;
  youtubeVideoLink: string;
  logos: Logo[];
  opinioesConsumidores: OpiniaoConsumidor[];
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const { data } = await fetchHomePageData();

  const logos = data.logos_software.map((file) => {
    return { imgSrc: `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${file.directus_files_id}.svg` };
  });

  const opinioesConsumidores = data.opiniao_consumidor.map((opiniao) => {
    return {
      nome: opiniao.opiniao_consumidor_id.nome,
      descricao: opiniao.opiniao_consumidor_id.descricao,
    };
  });

  return {
    instagram: data.instagram,
    whatsapp: data.whatsapp,
    youtubeChannel: data.canal_youtube,
    youtubeVideoLink: data.link_video_youtube,
    logos,
    opinioesConsumidores,
  };
}
