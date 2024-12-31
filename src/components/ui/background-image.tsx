"use client";

import { motion } from "motion/react";

export const BackgroundImage = () => (
  <>
    <motion.div
      className="absolute inset-0 w-full h-full bg-[url('/background_hero.webp')] bg-cover bg-center bg-fixed -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    />
    <div
      className="absolute inset-x-0 bottom-0 h-60"
      style={{
        boxShadow: "inset 0 -76px white",
      }}
    />
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/40 to-white/50 -z-10" />
  </>
);
