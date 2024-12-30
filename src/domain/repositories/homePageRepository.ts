import { apiGet } from "@/infrastructure/http/externalApiClient";

interface Logo {
  logo: string;
}

interface OpiniaoConsumidor {
  nome: string;
  descricao: string;
}

interface HomePageData {
  data: {
    instagram: string;
    whatsapp: string;
    canal_youtube: string;
    link_video_youtube: string;
    logos_software: {
      logos_software_id: Logo;
    }[];
    opiniao_consumidor: {
      opiniao_consumidor_id: OpiniaoConsumidor;
    }[];
  };
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const endpoint =
    "/items/pagina_inicial?fields=*,logos_software.logos_software_id.logo,opiniao_consumidor.opiniao_consumidor_id.nome,opiniao_consumidor.opiniao_consumidor_id.descricao";
  return apiGet<HomePageData>(endpoint);
}
