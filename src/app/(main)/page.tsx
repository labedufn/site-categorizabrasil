import { Hero } from "@/components/hero/hero";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getHomePageAction } from "./actions";
import { CustomerOpinion } from "@/components/ui/customer-opinion";
import { Faq } from "@/components/faq/faq";
import { GeoMap } from "@/components/ui/geo-map";
import { LayoutGeneral } from "@/layouts/layout-general";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "Site categorização dos serviços de alimentação no Brasil.",
  openGraph: {
    title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
    description: "Site categorização dos serviços de alimentação no Brasil.",
    url: "https://homologa.categorizabrasil.com.br",
    siteName: "Categoriza Brasil",
    images: [
      {
        url: "/background_hero.webp",
        width: 1200,
        height: 630,
        alt: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
    description: "Site categorização dos serviços de alimentação no Brasil.",
    images: ["/background_hero.webp"],
  },
};

export default async function Home() {
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
        <GeoMap />
        <CustomerOpinion reviews={reviews} />
      </LayoutGeneral>
    </>
  );
}
