"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

interface Logo {
  imgSrc: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos);
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    const columnIndex = index % columnCount;
    const currentColumn = columns[columnIndex];

    if (currentColumn[currentColumn.length - 1]?.imgSrc !== logo.imgSrc) {
      currentColumn.push(logo);
    }
  });

  return columns;
};

interface LogoColumnProps {
  logos: Logo[];
  index: number;
  currentTime: number;
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(({ logos, index, currentTime }) => {
  if (!logos.length) return null;

  const cycleInterval = 2000;
  const columnDelay = index * 200;
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);

  const previousIndex = (currentIndex - 1 + logos.length) % logos.length;
  const currentLogo =
    logos[currentIndex].imgSrc === logos[previousIndex].imgSrc
      ? logos[(currentIndex + 1) % logos.length]
      : logos[currentIndex];

  return (
    <motion.div
      className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center py-2"
          initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.3,
            },
          }}
        >
          <Image
            src={currentLogo.imgSrc}
            alt="Logo"
            width={128}
            height={128}
            className="w-20 h-20 md:w-32 md:h-32 max-w-[80%] max-h-[80%] object-contain"
            unoptimized
            priority
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

LogoColumn.displayName = "LogoColumn";

interface LogoCarouselProps {
  logos: Logo[];
  columnCount?: number;
}

export const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos, columnCount = 2 }) => {
  const [logoSets, setLogoSets] = useState<Logo[][]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (logos.length > 0) {
      const distributedLogos = distributeLogos(logos, columnCount);
      setLogoSets(distributedLogos);
    }
  }, [logos, columnCount]);

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  if (!logos.length) {
    return <div className="text-center text-gray-500">Nenhum logo disponível.</div>;
  }

  return (
    <div className="flex space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn key={index} logos={logos} index={index} currentTime={currentTime} />
      ))}
    </div>
  );
};
