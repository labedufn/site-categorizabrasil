"use client";

import { DecorativePattern } from "../ui/decorative-pattern";
import { GradualSpacing } from "../ui/gradual-spacing";

export const HeroHeader = () => (
  <div className="max-w-xl mb-10 md:mx-auto md:text-center md:mb-12">
    <h2 className="max-w-lg mb-6 font-bold text-2xl tracking-tight text-secondary-500 sm:text-4xl md:mx-auto">
      <span className="relative inline-block">
        <DecorativePattern />
        <GradualSpacing text="Categorização dos" className="relative" />
      </span>{" "}
      <GradualSpacing text="Serviços de Alimentação" className="text-primary-500 whitespace-nowrap" />
    </h2>
    <GradualSpacing
      className="text-base text-gray-600 md:text-lg md:max-w-screen-sm"
      text="Um sistema de classificação que garante a qualidade sanitária dos estabelecimentos alimentícios."
    />
  </div>
);
