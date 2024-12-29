"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutDefault } from "@/layouts/layout-default";
import { motion, AnimatePresence } from "motion/react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 w-full bg-white/60 backdrop-filter backdrop-blur-xl z-50 border-t border-black/10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        >
          <LayoutDefault className="py-8 mx-auto lg:flex lg:items-center lg:gap-x-16">
            <p className="text-gray-700 font-medium text-xs lg:text-base">
              🍪 Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência de navegação, personalizar
              conteúdo, fornecer recursos e analisar o tráfego do site. Ao continuar navegando, você concorda com a
              nossa{" "}
              <Link
                href="/politica-privacidade"
                className="text-primary underline hover:text-secondary tracking-wide transition duration-200"
              >
                Política de Privacidade
              </Link>
              .
            </p>
            <div className="flex items-center mt-6 shrink-0 lg:mt-0">
              <Button
                variant="secondary"
                className="lg:h-12 h-8 lg:px-6 px-4 lg:text-base text-xs"
                onClick={handleAccept}
              >
                Continuar
              </Button>
            </div>
          </LayoutDefault>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
