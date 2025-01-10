"use client";

import { LayoutDefault } from "@/layouts/layout-default";
import { motion } from "motion/react";
import Image from "next/image";

interface ImageHeaderProps {
  src: string;
  title: string;
  subtitle?: string;
}

export function ImageHeader({ src, title, subtitle }: ImageHeaderProps) {
  return (
    <div
      className="mb-16 md:mb-24"
      style={{
        position: "relative",
        width: "100%",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          left: "0",
          top: "0",
        }}
      >
        <Image src={src} fill sizes="100vw" alt={title} className="object-cover grayscale opacity-20" priority />
      </motion.div>
      <div className="absolute inset-0 bg-primary z-0 mix-blend-multiply" />

      <LayoutDefault className="relative z-10 py-24 sm:py-40 mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-base leading-5 sm:text-xl mt-3 font-medium text-primary-200">{subtitle}</p>}
      </LayoutDefault>
    </div>
  );
}
