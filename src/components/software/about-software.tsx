"use client";

import { LayoutDefault } from "@/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { FeaturesSection } from "../ui/feature-section";
import { LogoCarousel } from "../ui/logo-carousel";

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
