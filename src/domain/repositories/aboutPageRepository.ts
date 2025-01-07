import { apiGet } from "@/infrastructure/http/externalApiClient";

interface AboutPageData {
  data: {
    texto: string;
  };
}

export async function fetchAboutPageData(): Promise<AboutPageData> {
  const endpoint = "/items/sobre";
  return apiGet<AboutPageData>(endpoint);
}
