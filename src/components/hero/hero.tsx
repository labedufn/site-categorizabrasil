"use client";

import { Features } from "@/components/hero/features";
import { HeroHeader } from "@/components/hero/hero-header";
import { BackgroundImage } from "@/components/ui/background-image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative">
      <BackgroundImage />
      <div className="relative z-10">
        <div className="py-16 mx-auto max-w-screen-xl p-6 lg:p-0 lg:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex md:justify-center mb-4 z-10"
          >
            <Image src="/selos.svg" alt="Selos" width={120} height={120} priority />
          </motion.div>
          <HeroHeader />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center sm:justify-center"
          >
            <Button>Saiba mais</Button>
          </motion.div>
        </div>
        <Features />
      </div>
    </div>
  );
};
