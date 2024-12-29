"use client";

import { cn } from "@/lib/utils";
import Marquee from "./marquee";
import Image from "next/image";
import { HeaderTitle } from "./header-title";

const reviews = [
  {
    name: "Carlos",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
  },
  {
    name: "Ana",
    body: "Suspendisse potenti. Proin consectetur justo a tincidunt laoreet. Donec malesuada feugiat risus, a condimentum ipsum.",
  },
  {
    name: "João",
    body: "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum, ligula eget feugiat pharetra, ante erat iaculis nibh.",
  },
  {
    name: "Marina",
    body: "Cras ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat.",
  },
  {
    name: "Lucas",
    body: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed.",
  },
  {
    name: "Beatriz",
    body: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ name, body }: { name: string; body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-white hover:bg-neutral-50 transition-colors cursor-default",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold text-primary">{name}</figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-600">{body}</blockquote>
    </figure>
  );
};

export function CustomerOpinion() {
  return (
    <div className="mt-24 md:mt-32">
      <HeaderTitle topText="Depoimentos" mainTitle="Opinião do Consumidor" className="mb-0 px-6 sm:px-0" />
      <div className="relative m-auto overflow-hidden">
        <Image
          src="/background_testimonial.jpg"
          fill
          alt="Background"
          className="object-cover object-center"
          priority
        />
        <Image src="/dot.svg" fill alt="Dots Overlay" className="absolute z-10 top-0 object-cover" priority />
        <div className="absolute inset-0 bg-white opacity-70 pointer-events-none z-10" />
        <div className="relative z-30 pb-32 pt-12">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white z-30"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white z-30"></div>
      </div>
    </div>
  );
}
