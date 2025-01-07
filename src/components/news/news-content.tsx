"use client";

import dynamic from "next/dynamic";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumb } from "../ui/breadcrumb";
import Image from "next/image";

const PhotoProvider = dynamic(() => import("react-photo-view").then((mod) => mod.PhotoProvider), { ssr: false });
const PhotoView = dynamic(() => import("react-photo-view").then((mod) => mod.PhotoView), { ssr: false });

interface ImagensNoticia {
  imgSrc: string;
}

interface NewsContentProps {
  title: string;
  date: string;
  imageSrc: string;
  content: string;
  imagesNews?: ImagensNoticia[];
}

export const NewsContent: React.FC<NewsContentProps> = ({ title, date, imageSrc, content, imagesNews = [] }) => {
  return (
    <>
      <div className="mb-8">
        <Breadcrumb
          items={[{ label: "Início", href: "/" }, { label: "Notícias", href: "/noticias" }, { label: title }]}
        />
        <h2 className="text-5xl font-bold text-primary mb-2">{title}</h2>
        <p className="font-medium text-sm text-gray-500">Publicado em {date}</p>
      </div>

      <div className="w-full md:h-[400px] h-44 mb-8 relative">
        <Image src={imageSrc} alt={title} fill className="object-cover rounded-2xl" sizes="100vh" />
      </div>
      <MarkdownRenderer content={content} className="max-w-full" />
      {imagesNews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4">
          <PhotoProvider>
            {imagesNews.map((img, index) => (
              <PhotoView key={index} src={img.imgSrc}>
                <div className="w-full md:h-40 h-44 relative">
                  <Image
                    src={img.imgSrc}
                    alt={`Imagem adicional ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl cursor-pointer"
                    sizes="100vh"
                  />
                </div>
              </PhotoView>
            ))}
          </PhotoProvider>
        </div>
      )}
    </>
  );
};
