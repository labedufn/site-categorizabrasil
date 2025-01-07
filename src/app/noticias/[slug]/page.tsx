import { getNewsPageAction } from "@/app/noticias/actions";
import { NewsContent } from "@/components/news/news-content";
import { LayoutGeneral } from "@/layouts/layout-general";
import { LayoutInterno } from "@/layouts/layout-interno";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Notícia",
  description: "Conheça as últimas notícias do projeto Categoriza Brasil",
};

export default async function Noticia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newsPageData = await getNewsPageAction();
  const newsData = newsPageData.find((news) => news.slug === slug);

  if (!newsData) {
    notFound();
  }

  return (
    <LayoutGeneral>
      <LayoutInterno className="max-w-screen-md mx-auto my-24 px-6 md:px-0">
        <NewsContent
          title={newsData.titulo}
          date={newsData.criadoEm}
          imageSrc={newsData.imagemPrincipal}
          content={newsData.texto}
          imagesNews={newsData.imagensNoticia}
        />
      </LayoutInterno>
    </LayoutGeneral>
  );
}
