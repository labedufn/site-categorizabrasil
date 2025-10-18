import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { NewsSection } from "@/components/news/news-section";
import { getNewsPageAction } from "./actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Notícias",
  description: "Fique por dentro das novidades do Categoriza Brasil",
};

export default async function Noticias() {
  const newsPageData = await getNewsPageAction();
  const breadcrumbItems = [{ label: "Início", href: "/" }, { label: "Notícias" }];

  const newsItems = newsPageData.map((news) => ({
    imageSrc: news.heroImage || "/images/backgrounds/background_news.webp",
    title: news.title,
    publishedAt: news.publishedAt,
    publishedAtLabel: news.publishedAtLabel,
    url: `/noticias/${news.slug}`,
  }));

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/images/backgrounds/background_news.webp"
            title="Notícias"
            subtitle="Fique por dentro das novidades"
          />
          <NewsSection breadcrumbItems={breadcrumbItems} initialNewsItems={newsItems} />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
