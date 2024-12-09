import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navigation/navbar";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";

export default function Home() {
  return (
    <>
      <WhatsappFab />
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-52">
        <h2 className="text-2xl font-bold">Hello World!</h2>
      </div>
      <Footer />
    </>
  );
}
