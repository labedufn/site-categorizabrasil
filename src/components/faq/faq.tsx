"use client";

import { LayoutDefault } from "@/layouts/layout-default";
import { HeaderTitle } from "../ui/header-title";
import { Accordion, Content, Tab, Trigger } from "../ui/accordion";

const items = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor, lectus at gravida vehicula, elit risus tincidunt ligula, ut volutpat nisi justo at urna.",
  },
  {
    id: "2",
    title: "Ut enim ad minim veniam?",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
  {
    id: "3",
    title: "Duis aute irure dolor in reprehenderit?",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    id: "4",
    title: "Sed ut perspiciatis unde omnis iste?",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
  },
];

export function Faq() {
  return (
    <div
      className="relative py-24 mt-24 md:mt-32"
      style={{
        backgroundImage: "url('/background_faq.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-secondary opacity-90 z-0" />
      <LayoutDefault className="relative z-10 mx-auto">
        <HeaderTitle
          topText="FAQ"
          mainTitle="Perguntas Frequentes"
          mainTitleColor="text-secondary-900"
          topTextColor="text-secondary-100"
        />
        <Accordion className="w-full">
          {items.map((item) => (
            <Tab key={item.id} className="border-b border-secondary-800/30">
              <Trigger className="text-[18px]">
                <span className="flex items-center gap-3 text-secondary-900 font-bold">{item.title}</span>
              </Trigger>
              <Content className="text-secondary-900">{item.content}</Content>
            </Tab>
          ))}
        </Accordion>
      </LayoutDefault>
    </div>
  );
}
