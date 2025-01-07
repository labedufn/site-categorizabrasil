import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { LayoutGeneral } from "@/layouts/layout-general";
import { LayoutDefault } from "@/layouts/layout-default";
import { getEnglishPageAction } from "./actions";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Sobre",
  description: "",
};

export default async function Sobre() {
  const englishPageData = await getEnglishPageAction();

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/background_about.webp"
            title="Sobre o Categoriza Brasil"
            subtitle="Conheça mais sobre o projeto"
          />
          <LayoutDefault className="mx-auto mb-16 md:mb-24">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sobre" }]} />
            <MarkdownRenderer content={englishPageData.text} className="max-w-full" />
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
