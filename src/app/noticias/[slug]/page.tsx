import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNews } from "@/server/features/news";
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
  const lista = await getNews();
  const news = lista.find((n) => n.slug === slug);
  if (!news) notFound();

  const plainText = news.body
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const description = plainText.slice(0, 155);

  return {
    title: `Categoriza Brasil - ${news.title}`,
    description,
    openGraph: {
      title: `Categoriza Brasil - ${news.title}`,
      description,
      images: [
        {
          url: news.heroImage,
          width: 800,
          height: 600,
          alt: news.title,
        },
      ],
    },
  };
}

export default async function Noticia({ params }: Props) {
  const { slug } = await params; // ✅ await params
  const lista = await getNews();
  const news = lista.find((n) => n.slug === slug);
  if (!news) notFound();

  return (
    <LayoutGeneral>
      <LayoutInterno className="max-w-screen-md mx-auto my-24 px-6 md:px-0">
        <NewsContent
          title={news.title}
          date={news.publishedAtLabel}
          imageSrc={news.heroImage || "/background_news.webp"}
          content={news.body}
          imagesNews={news.gallery}
        />
      </LayoutInterno>
    </LayoutGeneral>
  );
}
