import { apiGet } from "@/infrastructure/http/externalApiClient";

interface DirectusFile {
  directus_files_id: string;
}

interface HomePageData {
  data: {
    instagram: string;
    whatsapp: string;
    canal_youtube: string;
    link_video_youtube: string;
    logos_software: DirectusFile[];
  };
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const endpoint = "/items/pagina_inicial?fields=*,logos_software.directus_files_id";
  return apiGet<HomePageData>(endpoint);
}
