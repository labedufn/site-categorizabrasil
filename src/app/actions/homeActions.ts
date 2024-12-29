"use server";

import { apiClient } from "@/utils/apiClient";

export interface HomeActions {
  instagram: string;
  whatsapp: string;
  canal_youtube: string;
  link_video_youtube: string;
  logos_estabelecimentos?: { directus_files_id: string }[];
}

export async function fetchHomeActions(): Promise<HomeActions> {
  const response = await apiClient.get("/items/pagina_inicial?fields=*,logos_estabelecimentos.directus_files_id");
  return response.data.data;
}
