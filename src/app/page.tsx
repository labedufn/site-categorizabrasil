import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navigation/navbar";
import { About } from "@/components/sections/about";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";

export default function Home() {
  return (
    <>
      <WhatsappFab />
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </>
  );
}
