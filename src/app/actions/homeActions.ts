"use server";

import { apiClient } from "@/utils/apiClient";
import { validateHomeData } from "@/validators/homeData";

export interface HomeActions {
  instagram: string;
  whatsapp: string;
  canal_youtube: string;
  link_video_youtube: string;
}

export async function fetchHomeActions(): Promise<HomeActions> {
  const response = await apiClient.get("/items/pagina_inicial");
  return validateHomeData(response.data.data);
}
