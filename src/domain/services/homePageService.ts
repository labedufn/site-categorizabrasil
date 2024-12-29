import { fetchHomePageData } from "../repositories/homePageRepository";

export interface Logo {
  imgSrc: string;
}

export interface HomePageContent {
  instagram: string;
  whatsapp: string;
  youtubeChannel: string;
  youtubeVideoLink: string;
  logos: Logo[];
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const { data } = await fetchHomePageData();

  const logos = data.logos_software.map((file) => {
    return { imgSrc: `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${file.directus_files_id}.svg` };
  });

  return {
    instagram: data.instagram,
    whatsapp: data.whatsapp,
    youtubeChannel: data.canal_youtube,
    youtubeVideoLink: data.link_video_youtube,
    logos,
  };
}
