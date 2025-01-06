import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { LayoutGeneral } from "@/layouts/layout-general";
import { NewsSection } from "@/components/news/news-section";
import { getNewsPageAction } from "./actions";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Notícias",
  description: "",
};

export default async function Noticias() {
  const newsPageData = await getNewsPageAction();
  const breadcrumbItems = [{ label: "Início", href: "/" }, { label: "Notícias" }];

  const newsItems = newsPageData.map((news) => ({
    imageSrc: news.imagemPrincipal,
    title: news.titulo,
    date: news.criadoEm,
    url: `/noticias/${news.slug}`,
  }));

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader src="/background_news.webp" title="Notícias" subtitle="Fique por dentro das novidades" />
          <NewsSection breadcrumbItems={breadcrumbItems} initialNewsItems={newsItems} />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
