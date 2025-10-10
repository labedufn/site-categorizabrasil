import { getNewsPageAction } from "@/app/noticias/actions";
import { StoryGenerator } from "@/components/news/story-generator";
import { notFound } from "next/navigation";

export const revalidate = 20;

export default async function Story({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const newsPageData = await getNewsPageAction();
  const newsData = newsPageData.find((news) => news.slug === slug);

  if (!newsData) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <StoryGenerator
        title={newsData.title}
        date={newsData.publishedAtLabel}
        imageSrc={newsData.heroImage || "/background_news.webp"}
      />
    </div>
  );
}
