import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { LayoutGeneral } from "@/layouts/layout-general";
import { LayoutDefault } from "@/layouts/layout-default";
import { getEnglishPageAction } from "./actions";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export const metadata: Metadata = {
  title: "Categoriza Brasil - English Information",
  description: "",
};

export default async function English() {
  const englishPageData = await getEnglishPageAction();

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/background_english.webp"
            title="About Categoriza Brasil"
            subtitle="Categorization of Food Services"
          />
          <LayoutDefault className="mx-auto mb-16 md:mb-24">
            <MarkdownRenderer content={englishPageData.text} className="max-w-full" />
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
