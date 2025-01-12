"use client";

import React, { useRef } from "react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumb } from "../ui/breadcrumb";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { StoryGenerator, StoryGeneratorHandle } from "./story-generator";
import { Icon } from "../ui/icons";
import { motion } from "motion/react";
import Image from "next/image";

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
  const storyGeneratorRef = useRef<StoryGeneratorHandle>(null);

  const handleDownloadImage = () => {
    if (storyGeneratorRef.current) {
      storyGeneratorRef.current.generateImage();
    }
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`${title} - Leia mais: ${url}`)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <>
      <div className="mb-8">
        <Breadcrumb
          items={[{ label: "Início", href: "/" }, { label: "Notícias", href: "/noticias" }, { label: title }]}
        />
        <h2 className="text-2xl md:text-5xl font-bold text-primary mb-2">{title}</h2>
        <p className="font-medium text-sm text-gray-500 mb-4">Publicado em {date}</p>
        <div>
          <p className="font-medium text-sm text-gray-600 mb-2">Compartilhar:</p>
          <motion.button
            onClick={handleDownloadImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mr-4"
          >
            <Icon.instagram className="w-6 h-6 text-primary" />
          </motion.button>
          <motion.button
            onClick={handleShareWhatsApp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Icon.whatsapp className="w-6 h-6 text-primary" />
          </motion.button>
        </div>
      </div>
      <div className="mb-8 relative w-full md:h-[400px] h-44">
        <Image
          src={imageSrc}
          alt={title}
          className="object-cover rounded-2xl"
          fill
          sizes="100vh"
          unoptimized
          priority
        />
      </div>
      <MarkdownRenderer content={content} className="max-w-full" />

      {imagesNews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4">
          <PhotoProvider>
            {imagesNews.map((img, index) => (
              <PhotoView key={index} src={img.imgSrc}>
                <div className="relative">
                  <Image
                    src={img.imgSrc}
                    alt={`Imagem adicional ${index + 1}`}
                    className="object-cover rounded-2xl cursor-pointer w-full md:h-40 h-44"
                    sizes="100vh"
                    fill
                    unoptimized
                    priority
                  />
                </div>
              </PhotoView>
            ))}
          </PhotoProvider>
        </div>
      )}

      <StoryGenerator ref={storyGeneratorRef} title={title} date={date} imageSrc={imageSrc} />
    </>
  );
};
