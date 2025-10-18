import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutDefault } from "@/components/layouts/layout-default";
import { getEnglishPageAction } from "./actions";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - English Information",
  description: "Learn more about the Categoriza Brasil project",
};

export default async function English() {
  const englishPageData = await getEnglishPageAction();

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/images/backgrounds/background_english.webp"
            title="About Categoriza Brasil"
            subtitle="Categorization of Food Services"
          />
          <LayoutDefault className="mx-auto mb-16 md:mb-24">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "English Information" }]} />
            <MarkdownRenderer content={englishPageData.text} className="max-w-full" />
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
