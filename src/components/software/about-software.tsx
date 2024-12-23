"use client";

import { LayoutDefault } from "@/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { FeaturesSection } from "../ui/feature-section";
import { DecorativePattern } from "../ui/decorative-pattern";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeActions } from "@/app/actions/homeActions";

export function AboutSoftware() {
  const { data } = useQuery({
    queryKey: ["HomeData"],
    queryFn: fetchHomeActions,
  });

  return (
    <LayoutDefault className="mx-auto my-32 lg:relative">
      <div className="absolute hidden lg:block -left-[640px] top-20 h-full w-32 rotate-90 z-20 scale-150">
        <DecorativePattern />
      </div>
      <HeaderTitle topText="Software" mainTitle="Categoriza Brasil" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center gap-8">
        <HeroVideoDialog videoSrc={data?.link_video_youtube ?? ""} />
        <FeaturesSection />
      </div>
    </LayoutDefault>
  );
}
