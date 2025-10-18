"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import * as htmlToImage from "html-to-image";
import { StoryCard } from "./story-card";
import { Logo } from "../ui/logos";

interface StoryGeneratorProps {
  title: string;
  date: string;
  imageSrc: string;
}

export interface StoryGeneratorHandle {
  generateImage: () => Promise<void>;
}

export const StoryGenerator = forwardRef<StoryGeneratorHandle, StoryGeneratorProps>(
  ({ title, date, imageSrc }, ref) => {
    const storyRef = useRef<HTMLDivElement>(null);

    async function generateImage() {
      if (!storyRef.current) return;
      try {
        const dataUrl = await htmlToImage.toPng(storyRef.current, {
          width: 1080,
          height: 1920,
          pixelRatio: 1,
        });

        const link = document.createElement("a");
        link.download = "story.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Erro ao gerar imagem", error);
      }
    }

    useImperativeHandle(ref, () => ({
      generateImage,
    }));

    return (
      <div className="hidden">
        <div
          ref={storyRef}
          className="
          relative 
          w-[1080px] 
          h-[1920px] 
          bg-gradient-to-br 
          from-primary-500
          to-primary-800
          flex 
          flex-col 
          justify-center 
          items-center 
          p-8
        "
        >
          <div
            className="
            absolute
            top-[260px]
            flex
            justify-center
          "
          >
            <Logo.white className="w-[330px] h-auto" sizes="330px" priority />
          </div>

          <div className="w-[780px]">
            <StoryCard src={imageSrc} title={title} date={date} />
          </div>
        </div>
      </div>
    );
  },
);

StoryGenerator.displayName = "StoryGenerator";
