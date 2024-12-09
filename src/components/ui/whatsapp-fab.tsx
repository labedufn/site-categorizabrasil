"use client";

import { motion } from "motion/react";
import { Icon } from "./icons";
import Link from "next/link";

export const WhatsappFab = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Link
        href="https://api.whatsapp.com/message/A553UPCS3K2MI1?autoload=1&app_absent=0"
        target="blank"
        className="bg-green-500 rounded-full p-2 w-14 h-14 flex justify-center items-center shadow-sm"
      >
        <Icon.whatsapp className="w-7 h-7 text-white" />
      </Link>
    </motion.div>
  );
};
