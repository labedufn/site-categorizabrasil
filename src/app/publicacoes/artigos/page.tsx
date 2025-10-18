import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { ArticlesSection } from "@/components/articles-plublication/articles-section";
import { getArticlesPageAction } from "./actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Artigos",
  description: "Artigos sobre o Categoriza Brasil",
};

export default async function Articles() {
  const articlesPageData = await getArticlesPageAction();
  const breadcrumbItems = [{ label: "Início", href: "/" }, { label: "Publicações", href: "#" }, { label: "Artigos" }];

  const articlesItems = articlesPageData.map((articles) => ({
    title: articles.title,
    resume: articles.resume,
    authors: articles.authors,
    date: articles.date,
    url: articles.url,
  }));
  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/images/backgrounds/background_publi.webp"
            title="Artigos"
            subtitle="Aqui você encontra artigos sobre o Categoriza Brasil"
          />
          <ArticlesSection breadcrumbItems={breadcrumbItems} initialArticlesItems={articlesItems} />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
