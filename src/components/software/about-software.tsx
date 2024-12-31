"use client";

import { LayoutDefault } from "@/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { FeaturesSection } from "../ui/feature-section";
import { LogoCarousel } from "../ui/logo-carousel";
import { DecorativePattern } from "../ui/decorative-pattern";

interface Logo {
  imgSrc: string;
}

interface AboutSoftwareProps {
  logos: Logo[];
  youtubeLink: string;
}

export function AboutSoftware({ logos, youtubeLink }: AboutSoftwareProps) {
  return (
    <LayoutDefault className="mx-auto mt-24 md:mt-32 lg:relative">
      <div className="absolute hidden lg:block -left-[640px] top-5 h-full w-32 rotate-90 z-20 scale-150">
        <DecorativePattern />
      </div>
      <HeaderTitle topText="Software" mainTitle="Categoriza Brasil" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center gap-8">
        <div className="space-y-14">
          <HeroVideoDialog videoSrc={youtubeLink} />
          <div className="flex justify-center">
            <LogoCarousel columnCount={3} logos={logos} />
          </div>
        </div>
        <FeaturesSection />
      </div>
    </LayoutDefault>
  );
}
