"use client";

import { LayoutDefault } from "@/components/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { Accordion, Content, Tab, Trigger } from "../ui/accordion";
import { motion } from "motion/react";
import Image from "next/image";

type FaqItem = {
  title: string;
  content: string;
};

type FaqProps = {
  items: FaqItem[];
};

export function Faq({ items }: FaqProps) {
  return (
    <div
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
        <Image
          src="/images/backgrounds/background_faq.webp"
          sizes="100vw"
          fill
          alt="Background FAQ"
          className="object-cover opacity-15"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-secondary z-0 mix-blend-multiply" />

      <div className="relative z-10 py-24 mt-24 md:mt-32">
        <LayoutDefault className="mx-auto">
          <HeaderTitle
            topText="FAQ"
            mainTitle="Perguntas Frequentes"
            mainTitleColor="text-secondary-900"
            topTextColor="text-secondary-100"
            className="mb-12"
          />
          <Accordion className="w-full">
            {items.map((item, index) => (
              <Tab key={index} className="border-b border-secondary-800/30">
                <Trigger className="text-[18px]">
                  <span className="flex items-center gap-3 text-secondary-900 font-bold">{item.title}</span>
                </Trigger>
                <Content className="text-secondary-900">{item.content}</Content>
              </Tab>
            ))}
          </Accordion>
        </LayoutDefault>
      </div>
    </div>
  );
}
