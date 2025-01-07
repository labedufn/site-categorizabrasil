"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "./icons";

interface ArticlesCardProps {
  title: string;
  resume: string;
  authors: string;
  date: string;
  url: string;
}

export function ArticlesCard({ title, resume, authors, date, url }: ArticlesCardProps) {
  return (
    <Link href={url} target="blank">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-2xl border shadow-sm cursor-pointer overflow-hidden bg-white w-full h-full flex flex-col"
      >
        <div className="p-8 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-primary mb-2 transition duration-300 group-hover:text-secondary">
            {title}
          </h2>
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
              {date} <Icon.chevronRight className="w-3 h-3" /> {authors}
            </p>
          </div>
          <p className="text-sm text-primary font-medium mt-4">{resume}</p>
        </div>
      </motion.div>
    </Link>
  );
}

interface ArticlesGridProps {
  articles: ArticlesCardProps[];
}

export function ArticlesGrid({ articles }: ArticlesGridProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {articles.map((article, index) => (
        <div key={index} className="flex-1 min-w-[300px]">
          <ArticlesCard {...article} />
        </div>
      ))}
    </div>
  );
}
