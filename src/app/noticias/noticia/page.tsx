import { NewsContent } from "@/components/news/news-content";
import { LayoutGeneral } from "@/layouts/layout-general";
import { LayoutInterno } from "@/layouts/layout-interno";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Notícias",
  description: "",
};

export default function Noticia() {
  return (
    <>
      <LayoutGeneral>
        <LayoutInterno className="max-w-screen-md mx-auto my-24 px-6 md:px-0">
          <NewsContent />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
