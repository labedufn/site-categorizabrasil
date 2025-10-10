import { normalizeMarkdown } from "@/lib/normalizeMarkdown";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { aboutFallback } from "../../fallback/about";
import { AboutPageContent } from "./about.types";
import { aboutCmsResponseSchema } from "./about.schema";

const ABOUT_ENDPOINT = "/items/sobre";

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const response = await fetchCmsData<unknown>(ABOUT_ENDPOINT);

  if (!response) {
    return aboutFallback;
  }

  const parsed = aboutCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload da página sobre:", parsed.error.flatten());
    return aboutFallback;
  }

  return {
    text: normalizeMarkdown(parsed.data.data.texto),
  };
}
