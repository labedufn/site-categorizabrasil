"use client";

import { Features } from "@/components/hero/features";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from "@/components/ui/button-custom";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-[url('/images/backgrounds/background_hero.webp')] bg-cover bg-center bg-no-repeat bg-fixed"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/60" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-white" />

      <div className="relative z-10 pb-1">
        <div className="py-16 mx-auto max-w-screen-xl px-6 lg:px-0 lg:py-20">
          <div className="flex md:justify-center mb-4 z-10">
            <Image src="/images/seals/selos.svg" alt="Selos" width={120} height={120} unoptimized priority />
          </div>
          <HeroHeader />
          <div className="flex items-center sm:justify-center">
            <Link href="https://wa.me/message/A553UPCS3K2MI1" target="_blank">
              <Button>Entre em contato</Button>
            </Link>
          </div>
        </div>
        <Features />
      </div>
    </section>
  );
};
