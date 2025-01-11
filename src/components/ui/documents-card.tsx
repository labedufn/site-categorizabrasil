"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "./icons";

interface DocumentsCardProps {
  title: string;
  url: string;
}

export function DocumentsCard({ title, url }: DocumentsCardProps) {
  return (
    <Link href={url} target="blank">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-xl border shadow-sm cursor-pointer overflow-hidden bg-white w-full h-full flex flex-col"
      >
        <div className="p-4 flex-1 flex items-center gap-4">
          <Icon.fileText className="w-6 h-6 text-primary" />
          <h2 className="text-sm font-bold text-primary transition duration-300 group-hover:text-secondary">{title}</h2>
        </div>
      </motion.div>
    </Link>
  );
}

interface DocumentsGridProps {
  documents: DocumentsCardProps[];
}

export function DocumentsGrid({ documents }: DocumentsGridProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {documents.map((document, index) => (
        <div key={index} className="flex-1 min-w-[300px]">
          <DocumentsCard {...document} />
        </div>
      ))}
    </div>
  );
}
