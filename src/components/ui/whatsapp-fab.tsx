"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Icon } from "./icons";
import Link from "next/link";
import { Tooltip } from "./tooltip";

export const WhatsappFab = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const whatsappButton = (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Link
        href="https://wa.me/message/A553UPCS3K2MI1"
        target="_blank"
        className="bg-green-500 rounded-full p-2 w-14 h-14 flex justify-center items-center"
      >
        <Icon.whatsapp className="w-7 h-7 text-white" />
      </Link>
    </motion.div>
  );

  return (
    <div className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-40">
      {isMobile ? (
        whatsappButton
      ) : (
        <Tooltip
          content="Precisa de mais informações sobre quem pode categorizar? Entre em contato pelo WhatsApp"
          position="left"
          closable
          alwaysVisible
        >
          {whatsappButton}
        </Tooltip>
      )}
    </div>
  );
};
