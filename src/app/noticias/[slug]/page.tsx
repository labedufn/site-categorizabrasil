import type { Metadata } from "next";
import { getNewsPageAction } from "@/app/noticias/actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";
import { NewsContent } from "@/components/news/news-content";
import { notFound } from "next/navigation";

export const revalidate = 20;

const newsPageDataPromise = getNewsPageAction();

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const newsPageData = await newsPageDataPromise;
  const newsData = newsPageData.find((news) => news.slug === slug);
  if (!newsData) {
    notFound();
  }

  return {
    title: `Categoriza Brasil - ${newsData.titulo}`,
    description: newsData.texto,
    openGraph: {
      title: `Categoriza Brasil - ${newsData.titulo}`,
      description: newsData.texto,
      images: [
        {
          url: newsData.imagemPrincipal,
          width: 800,
          height: 600,
          alt: newsData.titulo,
        },
      ],
    },
  };
}

export default async function Noticia({ params }: Props) {
  const { slug } = await params;
  const newsPageData = await newsPageDataPromise;
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
