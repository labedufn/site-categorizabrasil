import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navigation/navbar";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { fetchHomeActions } from "@/app/actions/homeActions";

export default async function Home() {
  const data = await fetchHomeActions();

  return (
    <>
      <WhatsappFab />
      <Navbar />
      <Hero />
      <AboutSoftware data={data} />
      <Footer />
    </>
  );
}
