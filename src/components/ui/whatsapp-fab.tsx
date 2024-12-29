"use client";

import { motion } from "motion/react";
import { Icon } from "./icons";
import Link from "next/link";

export const WhatsappFab = () => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-20 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Link
        href="{data.whatsapp}"
        target="blank"
        className="bg-green-500 rounded-full p-2 w-14 h-14 flex justify-center items-center"
      >
        <Icon.whatsapp className="w-7 h-7 text-white" />
      </Link>
    </motion.div>
  );
};
