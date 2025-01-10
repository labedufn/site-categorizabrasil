import Image from "next/image";
import { Seal } from "@/types";

interface SealListProps {
  seals?: Seal[];
}

export function SealList({ seals }: SealListProps) {
  if (!seals || seals.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {seals.map((seal) => (
        <div
          key={seal.type}
          className="rounded-l-full inline-flex items-center"
          style={{ backgroundColor: seal.bgColor }}
        >
          <div className="inline-flex gap-8 items-center">
            <Image
              src={seal.imgSrc}
              alt={`Selo tipo ${seal.type}`}
              width={150}
              height={150}
              className="p-2 border-white border-4 rounded-full w-24 h-24 lg:w-40 lg:h-40"
              priority
              style={{ backgroundColor: seal.bgColor }}
            />
            <p className="font-bold pr-8 text-sm lg:text-base" style={{ color: seal.textColor }}>
              {seal.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
