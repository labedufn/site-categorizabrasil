"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { LayoutDefault } from "@/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { FeaturesSection } from "../ui/feature-section";
import { DecorativePattern } from "../ui/decorative-pattern";
import { LogoCarousel } from "../ui/logo-carousel";
import { fetchHomeActions } from "@/app/actions/homeActions";
import { getImageUrl } from "@/lib/getImageUrl";

export function AboutSoftware() {
  const { data, error } = useQuery({
    queryKey: ["HomeData"],
    queryFn: fetchHomeActions,
  });

  const logos =
    data?.logos_estabelecimentos?.map((logo) => ({
      imgSrc: getImageUrl(logo.directus_files_id) || "",
    })) ?? [];

  if (error) {
    return <div className="text-center text-red-500">Erro ao carregar os dados.</div>;
  }

  return (
    <LayoutDefault className="mx-auto my-32 lg:relative">
      <div className="absolute hidden lg:block -left-[640px] top-5 h-full w-32 rotate-90 z-20 scale-150">
        <DecorativePattern />
      </div>
      <HeaderTitle topText="Software" mainTitle="Categoriza Brasil" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center gap-8">
        <div className="space-y-14">
          <HeroVideoDialog videoSrc={data?.link_video_youtube ?? ""} />
          <div className="flex justify-center">
            <LogoCarousel columnCount={3} logos={logos} />
          </div>
        </div>
        <FeaturesSection />
      </div>
    </LayoutDefault>
  );
}
