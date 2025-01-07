import { apiGet } from "@/infrastructure/http/externalApiClient";

interface EnglishPageData {
  data: {
    texto: string;
  };
}

export async function fetchEnglishPageData(): Promise<EnglishPageData> {
  const endpoint = "/items/english_information";
  return apiGet<EnglishPageData>(endpoint);
}
