import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsPageContent } from "@/domain/services/newsPageService";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";
import { NewsContent } from "@/components/news/news-content";

export const revalidate = 300;
export const dynamic = "force-static";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lista = await getNewsPageContent();
  const news = lista.find((n) => n.slug === slug);
  if (!news) notFound();

  return {
    title: `Categoriza Brasil - ${news.titulo}`,
    description: news.texto,
    openGraph: {
      title: `Categoriza Brasil - ${news.titulo}`,
      description: news.texto,
      images: [
        {
          url: news.imagemPrincipal,
          width: 800,
          height: 600,
          alt: news.titulo,
        },
      ],
    },
  };
}

export default async function Noticia({ params }: Props) {
  const { slug } = await params; // ✅ await params
  const lista = await getNewsPageContent();
  const news = lista.find((n) => n.slug === slug);
  if (!news) notFound();

  return (
    <LayoutGeneral>
      <LayoutInterno className="max-w-screen-md mx-auto my-24 px-6 md:px-0">
        <NewsContent
          title={news.titulo}
          date={news.criadoEm}
          imageSrc={news.imagemPrincipal}
          content={news.texto}
          imagesNews={news.imagensNoticia}
        />
      </LayoutInterno>
    </LayoutGeneral>
  );
}
