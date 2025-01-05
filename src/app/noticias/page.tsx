import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { Teste } from "@/components/ui/teste";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Notícias",
  description: "",
};

export default async function Noticias() {
  return (
    <>
      <LayoutInterno>
        <ImageHeader src="/background_news.webp" title="Notícias" subtitle="Fique por dentro das novidades" />
        <Teste />
      </LayoutInterno>
    </>
  );
}
