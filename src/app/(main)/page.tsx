import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navigation/navbar";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getHomePageAction } from "./actions";
import { CustomerOpinion } from "@/components/ui/customer-opinion";

export default async function Home() {
  const homePageData = await getHomePageAction();

  return (
    <>
      <WhatsappFab />
      <Navbar
        instagram={homePageData.instagram}
        whatsapp={homePageData.whatsapp}
        youtubeChannel={homePageData.youtubeChannel}
      />
      <Hero />
      <AboutSoftware logos={homePageData.logos} youtubeLink={homePageData.youtubeVideoLink} />
      <CustomerOpinion />
      <Footer
        instagram={homePageData.instagram}
        whatsapp={homePageData.whatsapp}
        youtubeChannel={homePageData.youtubeChannel}
      />
    </>
  );
}
