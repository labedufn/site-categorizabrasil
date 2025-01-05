import { Hero } from "@/components/hero/hero";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getHomePageAction } from "./actions";
import { CustomerOpinion } from "@/components/ui/customer-opinion";
import { Faq } from "@/components/faq/faq";
import { GeoMap } from "@/components/ui/geo-map";

export const revalidate = 60;

export default async function Home() {
  const homePageData = await getHomePageAction();

  const reviews = homePageData.opinioesConsumidores.map((opiniao) => ({
    name: opiniao.nome,
    body: opiniao.descricao,
  }));

  return (
    <>
      <WhatsappFab />
      <Hero />
      <AboutSoftware logos={homePageData.logos} youtubeLink={homePageData.youtubeVideoLink} />
      <Faq />
      <GeoMap />
      <CustomerOpinion reviews={reviews} />
    </>
  );
}
