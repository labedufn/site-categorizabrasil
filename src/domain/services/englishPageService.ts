import { normalizeMarkdown } from "@/lib/normalizeMarkdown";
import { fetchEnglishPageData } from "../repositories/englishPageRepository";

export interface EnglishPageContent {
  text: string;
}

export async function getEnglishPageContent(): Promise<EnglishPageContent> {
  const { data } = await fetchEnglishPageData();

  return {
    text: normalizeMarkdown(data.texto),
  };
}
