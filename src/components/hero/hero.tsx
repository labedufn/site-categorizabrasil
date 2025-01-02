import { Features } from "@/components/hero/features";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          left: "0",
          top: "0",
        }}
      >
        <Image
          src="/background_hero.webp"
          fill
          sizes="100vw"
          alt="Background"
          priority
          unoptimized
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-60"
        style={{
          boxShadow: "inset 0 -76px white",
        }}
      />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/40 to-white/50" />
      <div className="relative z-10 pb-1">
        <div className="py-16 mx-auto max-w-screen-xl p-6 lg:p-0 lg:py-20">
          <div className="flex md:justify-center mb-4 z-10">
            <Image src="/selos.svg" alt="Selos" width={120} height={120} />
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
