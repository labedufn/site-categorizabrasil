import { getNewsPageAction } from "@/app/noticias/actions";
import { StoryGenerator } from "@/components/news/story-image-generator";
import { notFound } from "next/navigation";

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const newsPageData = await getNewsPageAction();
  const newsData = newsPageData.find((news) => news.slug === slug);

  if (!newsData) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <StoryGenerator title={newsData.titulo} date={newsData.criadoEm} imageSrc={newsData.imagemPrincipal} />
    </div>
  );
}
