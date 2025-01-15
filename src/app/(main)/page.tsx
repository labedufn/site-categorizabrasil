import { Hero } from "@/components/hero/hero";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getHomePageAction } from "./actions";
import { CustomerOpinion } from "@/components/ui/customer-opinion";
import { Faq } from "@/components/faq/faq";
import { LayoutGeneral } from "@/layouts/layout-general";
import { Metadata } from "next";
import { Marker, MarkerType, Seal } from "@/types";
import { GeoMapInitial } from "@/components/georeferencing/geo-map-initial";
import { getGeoreferencingPageAction } from "../georreferenciamento/actions";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "Site categorização dos serviços de alimentação no Brasil.",
  metadataBase: new URL("https://homologa.categorizabrasil.com.br"),
  openGraph: {
    title: "Categorização dos Serviços de Alimentação",
    description: "Site categorização dos serviços de alimentação no Brasil.",
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
      textColor: "#feffff",
      imgSrc: "/selo-c.svg",
      description: "Serviços que cumprem satisfatoriamente os requisitos.",
    },
  ];

  const reviews = homePageData.opinioesConsumidores.map((opiniao) => ({
    name: opiniao.nome,
    body: opiniao.descricao,
  }));

  const faq = homePageData.faq.map((faq) => ({
    title: faq.pergunta,
    content: faq.resposta,
  }));

  return (
    <>
      <LayoutGeneral>
        <WhatsappFab />
        <Hero />
        <AboutSoftware logos={homePageData.logos} youtubeLink={homePageData.youtubeVideoLink} />
        <Faq items={faq} />
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
