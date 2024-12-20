import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navigation/navbar";
import { AboutSoftware } from "@/components/software/about-software";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";

export default function Home() {
  return (
    <>
      <WhatsappFab />
      <Navbar />
      <Hero />
      <AboutSoftware />
      <Footer />
    </>
  );
}
