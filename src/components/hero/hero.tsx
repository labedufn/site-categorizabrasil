import { Features } from "@/components/hero/features";
import { HeroHeader } from "@/components/hero/hero-header";
import { BackgroundImage } from "@/components/ui/background-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative mb-16">
      <BackgroundImage />
      <div className="relative z-10">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex md:justify-center mb-4 z-10">
            <Image src="/selos.svg" alt="Selos" width={120} height={120} priority />
          </div>
          <HeroHeader />
          <div className="flex items-center sm:justify-center">
            <Button>Saiba mais</Button>
          </div>
        </div>
        <Features />
      </div>
    </div>
  );
};
