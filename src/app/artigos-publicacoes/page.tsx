import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { LayoutGeneral } from "@/layouts/layout-general";
import { ArticlesSection } from "@/components/articles-plublication/articles-section";
import { getArticlesPageAction } from "./actions";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Artigos e Publicações",
  description: "Artigos e publicações sobre o Categoriza Brasil",
};

export default async function Publicacoes() {
  const articlesPageData = await getArticlesPageAction();
  const breadcrumbItems = [{ label: "Início", href: "/" }, { label: "Artigos e Publicações" }];

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
            src="/background_publi.webp"
            title="Artigos e Publicações"
            subtitle="Aqui você encontra artigos e publicações sobre o Categoriza Brasil"
          />
          <ArticlesSection breadcrumbItems={breadcrumbItems} initialArticlesItems={articlesItems} />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
