import { getNewsPageAction } from "@/app/noticias/actions";
import { NewsContent } from "@/components/news/news-content";
import { LayoutGeneral } from "@/layouts/layout-general";
import { LayoutInterno } from "@/layouts/layout-interno";
import { notFound } from "next/navigation";

interface NoticiaProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(props: NoticiaProps) {
  const { slug } = await Promise.resolve(props.params);

  const newsPageData = await getNewsPageAction();
  const newsData = newsPageData.find((news) => news.slug === slug);

  if (!newsData) notFound();

  return {
    title: `Categoriza Brasil - ${newsData.titulo}`,
    description: newsData.texto.slice(0, 150),
  };
}

export default async function Noticia(props: NoticiaProps) {
  const { slug } = await Promise.resolve(props.params);

  const newsPageData = await getNewsPageAction();
  const newsData = newsPageData.find((news) => news.slug === slug);

  if (!newsData) notFound();

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
