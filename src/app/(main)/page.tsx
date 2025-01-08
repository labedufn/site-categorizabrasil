import { Hero } from "@/components/hero/hero";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getHomePageAction } from "./actions";
import { CustomerOpinion } from "@/components/ui/customer-opinion";
import { Faq } from "@/components/faq/faq";
import { LayoutGeneral } from "@/layouts/layout-general";
import { Metadata } from "next";
import { Marker, MarkerType, Seal } from "@/types";
import { GeoMapInitial } from "@/components/georeference/geo-map-initial";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "Site categorização dos serviços de alimentação no Brasil.",
};

export default async function Home() {
  const markers: Marker[] = [
    {
      lat: -29.68140806351066,
      lng: -53.81438297431279,
      type: MarkerType.A,
    },
    {
      lat: -29.69076350294833,
      lng: -53.836662147655815,
      type: MarkerType.B,
    },
    {
      lat: -29.699303768286583,
      lng: -53.788789920678354,
      type: MarkerType.C,
    },
  ];

  const seals: Seal[] = [
    {
      type: MarkerType.A,
      bgColor: "#efc33a",
      textColor: "#663513",
      imgSrc: "/selo-a.svg",
      description: "Serviços que cumprem com excelência os requisitos.",
    },
    {
      type: MarkerType.B,
      bgColor: "#a9a9a8",
      textColor: "#454547",
      imgSrc: "/selo-b.svg",
      description: "Serviços que cumprem muito bem os requisitos.",
    },
    {
      type: MarkerType.C,
      bgColor: "#af4f29",
      textColor: "#ffffff",
      imgSrc: "/selo-c.svg",
      description: "Serviços que cumprem satisfatoriamente os requisitos.",
    },
  ];

  const homePageData = await getHomePageAction();

  const reviews = homePageData.opinioesConsumidores.map((opiniao) => ({
    name: opiniao.nome,
    body: opiniao.descricao,
  }));

  return (
    <>
      <LayoutGeneral>
        <WhatsappFab />
        <Hero />
        <AboutSoftware logos={homePageData.logos} youtubeLink={homePageData.youtubeVideoLink} />
        <Faq />
        <GeoMapInitial
          topText="Estabelecimentos"
          mainTitle="Geolocalizados"
          centerLat={-29.756}
          centerLng={-53.768}
          zoom={7}
          markers={markers}
          seals={seals}
        />
        <CustomerOpinion reviews={reviews} />
      </LayoutGeneral>
    </>
  );
}
