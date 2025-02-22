import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getAboutPageAction } from "./actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";
import { LayoutDefault } from "@/components/layouts/layout-default";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Sobre",
  description: "Conheça mais sobre o projeto Categoriza Brasil",
};

export default async function Sobre() {
  const aboutPageData = await getAboutPageAction();

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
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Sobre" }]} />
            <MarkdownRenderer content={aboutPageData.text} className="max-w-full" />
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
