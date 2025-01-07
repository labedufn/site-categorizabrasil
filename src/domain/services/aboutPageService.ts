import { normalizeMarkdown } from "@/lib/normalizeMarkdown";
import { fetchAboutPageData } from "../repositories/aboutPageRepository";

export interface AboutPageContent {
  text: string;
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const { data } = await fetchAboutPageData();

  return {
    text: normalizeMarkdown(data.texto),
  };
}
