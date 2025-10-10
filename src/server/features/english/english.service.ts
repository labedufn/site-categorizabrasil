import { normalizeMarkdown } from "@/lib/normalizeMarkdown";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { englishFallback } from "../../fallback/english";
import { englishCmsResponseSchema } from "./english.schema";
import { EnglishPageContent } from "./english.types";

const ENGLISH_ENDPOINT = "/items/english_information";

export async function getEnglishPageContent(): Promise<EnglishPageContent> {
  const response = await fetchCmsData<unknown>(ENGLISH_ENDPOINT);

  if (!response) {
    return englishFallback;
  }

  const parsed = englishCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload da página em inglês:", parsed.error.flatten());
    return englishFallback;
  }

  return {
    text: normalizeMarkdown(parsed.data.data.texto),
  };
}
