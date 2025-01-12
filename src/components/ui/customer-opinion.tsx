import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";
import { HeaderTitle } from "./header-title";
import Image from "next/image";

type Review = {
  name: string;
  body: string;
};

type CustomerOpinionProps = {
  reviews: Review[];
};

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

export function CustomerOpinion({ reviews }: CustomerOpinionProps) {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="mt-24 md:mt-32">
      <HeaderTitle topText="Depoimentos" mainTitle="Opinião do Consumidor" className="px-6 sm:px-0" />
      <div className="relative m-auto overflow-hidden">
        <div
          style={{
            position: "relative",
            width: "100%",
            clipPath: "inset(0 0 0 0)",
          }}
        >
          <div
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              left: "0",
              top: "0",
            }}
          >
            <Image
              src="/background_testimonial.webp"
              sizes="100vw"
              alt="Background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <Image
            src="/dot.webp"
            sizes="100vh"
            alt="Dots Overlay"
            fill
            className="absolute z-10 top-0 object-cover"
            unoptimized
            priority
          />
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
    </div>
  );
}
