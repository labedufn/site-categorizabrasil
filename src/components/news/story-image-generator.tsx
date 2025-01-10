"use client";

import React, { useRef } from "react";

interface StoryImageGeneratorProps {
  logoSrc: string;
  newsCard: {
    src: string;
    title: string;
    date: string;
  };
}

export const StoryImageGenerator: React.FC<StoryImageGeneratorProps> = ({ logoSrc, newsCard }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#6a11cb");
    gradient.addColorStop(1, "#2575fc");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const logo = new window.Image();
    logo.src = logoSrc;
    logo.onload = () => {
      ctx.drawImage(logo, width / 2 - 150, 50, 300, 100);

      const newsCardImage = new window.Image();
      newsCardImage.src = newsCard.src;
      newsCardImage.onload = () => {
        ctx.drawImage(newsCardImage, width / 2 - 400, 400, 800, 400);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText(newsCard.title, width / 2, 850);
        ctx.fillStyle = "#cccccc";
        ctx.font = "28px Arial";
        ctx.fillText(`Publicado em ${newsCard.date}`, width / 2, 900);

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "story.png";
        link.click();
      };
    };
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button onClick={generateImage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Gerar Story
      </button>
    </div>
  );
};
