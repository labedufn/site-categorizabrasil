import { Navbar } from "@/components/navigation/navbar";
import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { getHomePageAction } from "../(main)/actions";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Georreferenciamento",
  description: "",
};

export default async function Georreferenciamento() {
  const homePageData = await getHomePageAction();

  return (
    <>
      <Navbar
        instagram={homePageData.instagram}
        whatsapp={homePageData.whatsapp}
        youtubeChannel={homePageData.youtubeChannel}
      />
      <ImageHeader
        src="/background_georef.webp"
        title="Georreferenciamento"
        subtitle="Busque os estabelecimentos geolocalizados"
      />
    </>
  );
}
