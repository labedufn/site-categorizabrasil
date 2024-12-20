"use client";

import { LayoutDefault } from "@/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { FeaturesSection } from "../ui/feature-section";
import { DecorativePattern } from "../ui/decorative-pattern";

export function AboutSoftware() {
  return (
    <LayoutDefault className="mx-auto my-32 lg:relative">
      <div className="absolute hidden lg:block -left-[490px] top-20 h-full w-32 rotate-90 z-20 scale-150">
        <DecorativePattern />
      </div>
      <HeaderTitle topText="Software" mainTitle="Categoriza Brasil" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <HeroVideoDialog
          videoSrc={"https://www.youtube.com/embed/qQY9Y8kK5eI?si=4JaGqMLPphkP3XD9"}
          thumbnailSrc={"/background_hero.png"}
        />
        <FeaturesSection />
      </div>
    </LayoutDefault>
  );
}
