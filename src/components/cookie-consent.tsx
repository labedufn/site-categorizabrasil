"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

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

  if (!isVisible) return null;

  return (
    <div>
      <div className="fixed bottom-0 w-full bg-white/60 backdrop-filter backdrop-blur-xl z-30 border-t border-black/10">
        <div className="md:max-w-screen-xl px-4 py-8 mx-auto lg:flex lg:items-center lg:gap-x-16">
          <p className="text-gray-700 font-medium">
            🍪 Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência de navegação, personalizar
            conteúdo, fornecer recursos e analisar o tráfego do site. Ao continuar navegando, você concorda com a nossa{" "}
            <Link
              href="/politica-privacidade"
              className="text-primary underline hover:text-secondary tracking-wide transition duration-200"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          <div className="flex items-center mt-6 shrink-0 lg:mt-0">
            <Button variant="secondary" onClick={handleAccept}>
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
