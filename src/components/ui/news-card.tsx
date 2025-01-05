"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./button-custom";
import { Icon } from "./icons";
import Link from "next/link";

interface NewsCardProps {
  src: string;
  title: string;
  date: string;
  url: string;
}

export function NewsCard({ src, title, date, url }: NewsCardProps) {
  return (
    <Link href={url}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-2xl border shadow-sm cursor-pointer overflow-hidden bg-white w-full"
      >
        <div className="relative w-full h-52">
          <Image src={src} alt={title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-primary mb-4 transition duration-300 group-hover:text-secondary">
            {title}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">{date}</p>
            <Button variant="ghost">
              Saiba mais
              <Icon.chevronRight className="w-4 h-4 ml-2 text-secondary" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
