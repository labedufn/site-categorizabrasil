import { Hero } from "@/components/hero/hero";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getHomePageAction } from "./actions";
import { CustomerOpinion } from "@/components/ui/customer-opinion";
import { Faq } from "@/components/faq/faq";
import { Metadata } from "next";
import { Marker, MarkerType, Seal } from "@/types";
import { GeoMapInitial } from "@/components/georeferencing/geo-map-initial";
import { getGeoreferencingPageAction } from "../mapa/actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import ogImage from "./opengraph-image.jpg";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "Site categorização dos serviços de alimentação no Brasil.",
  openGraph: {
    title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
    description: "Site categorização dos serviços de alimentação no Brasil.",
    images: [
      {
        url: ogImage.src,
        width: 800,
        height: 600,
        alt: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: ogImage.src,
        width: 800,
        height: 600,
        alt: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
      },
    ],
  },
};

export default async function Home() {
  const homePageData = await getHomePageAction();
  const georeferencingPageData = await getGeoreferencingPageAction();

  const markers: Marker[] = georeferencingPageData.map((item) => ({
    lat: item.localizacao.latitude,
    lng: item.localizacao.longitude,
    type: item.categoria as MarkerType,
    label: item.nomeEstabelecimento,
  }));

  const seals: Seal[] = [
    {
      type: MarkerType.A,
      bgColor: "#efc33a",
      textColor: "#663513",
      imgSrc: "/images/seals/selo-a.svg",
      description: "Serviços que cumprem com excelência os requisitos.",
    },
    {
      type: MarkerType.B,
      bgColor: "#a9a9a8",
      textColor: "#454547",
      imgSrc: "/images/seals/selo-b.svg",
      description: "Serviços que cumprem muito bem os requisitos.",
    },
    {
      type: MarkerType.C,
      bgColor: "#af4f29",
      textColor: "#feffff",
      imgSrc: "/images/seals/selo-c.svg",
      description: "Serviços que cumprem satisfatoriamente os requisitos.",
    },
  ];

  return (
    <>
      <LayoutGeneral>
        <WhatsappFab />
        <Hero />
        <AboutSoftware logos={homePageData.logos} youtubeLink={homePageData.youtubeVideoLink} />
        <Faq items={homePageData.faq} />
        <GeoMapInitial
          topText="Estabelecimentos"
          mainTitle="Geolocalizados"
          centerLat={-29.756}
          centerLng={-53.768}
          zoom={7}
          markers={markers}
          seals={seals}
        />
        <CustomerOpinion reviews={homePageData.reviews} />
      </LayoutGeneral>
    </>
  );
}
