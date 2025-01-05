import { Navbar } from "@/components/navigation/navbar";
import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { getHomePageAction } from "../(main)/actions";
import { LayoutInterno } from "@/layouts/layout-interno";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Notícias",
  description: "",
};

export default async function Noticias() {
  const homePageData = await getHomePageAction();

  return (
    <>
      <Navbar
        instagram={homePageData.instagram}
        whatsapp={homePageData.whatsapp}
        youtubeChannel={homePageData.youtubeChannel}
      />
      <LayoutInterno>
        <ImageHeader src="/background_news.webp" title="Notícias" subtitle="Fique por dentro das novidades" />
      </LayoutInterno>
    </>
  );
}
