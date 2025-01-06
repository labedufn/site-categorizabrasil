"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumb } from "../ui/breadcrumb";
import Image from "next/image";

interface MarkdownContent {
  content: string;
  className: string;
}

const markdownContent: MarkdownContent["content"] = `
**Lorem Ipsum** is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of [Lorem Ipsum](https://github.com/mauricioprb).
![](https://painel.categorizabrasil.com.br/assets/a1c20994-9157-494e-abad-a5418b8a7818)
`;

export const NewsContent: React.FC = () => {
  return (
    <>
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Notícias", href: "/noticias" },
            { label: "Where does it come from?" },
          ]}
        />
        <h2 className="text-5xl font-bold text-primary mb-2">Where does it come from? </h2>
        <p className="font-medium text-sm text-gray-500">Publicado em 00/00/0000</p>
      </div>
      <div className="w-full md:h-[400px] h-44 mb-8 relative">
        <Image src="/background_news.webp" alt="" fill className="object-cover rounded-2xl" sizes="100vh" />
      </div>
      <MarkdownRenderer content={markdownContent} className="max-w-full" />
    </>
  );
};
