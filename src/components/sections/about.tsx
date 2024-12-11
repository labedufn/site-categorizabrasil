"use client";

import Image from "next/image";
import Link from "next/link";
import sobreImg from "@/images/sobre.jpg";
import { Button } from "../ui/button";
import { DecorativePattern } from "../ui/decorative-pattern";
import { Icon } from "../ui/icons";
import { LayoutDefault } from "@/layouts/layout-default";

export const About = () => {
  return (
    <>
      <section className="py-24">
        <LayoutDefault className="mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex md:flex-1 relative">
            <div className="absolute -left-[380px] top-20 h-full w-32 rotate-90 z-20 scale-150">
              <DecorativePattern />
            </div>
            <Image
              src={sobreImg}
              alt="Sobre nós"
              width={1300}
              height={900}
              className="w-full md:h-full object-cover rounded-2xl relative"
            />
          </div>
          <div className="md:w-1/2 space-y-6 text-gray-600 md:py-8">
            <h1 className="text-primary font-bold text-2xl sm:text-3xl">Quem somos</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, saepe aliquid autem alias vero distinctio
              dignissimos consequatur? Excepturi quibusdam, quam ipsum hic, laudantium ducimus suscipit, culpa facere
              consequuntur repellat delectus.
            </p>
            <div className="flex">
              <Button variant="ghost">
                <Link href="/sobre">Ler mais</Link>
                <Icon.chevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </LayoutDefault>
      </section>
    </>
  );
};
