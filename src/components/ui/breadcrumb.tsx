"use client";

import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={clsx("flex items-center mb-12", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center font-medium">
          {item.href ? (
            <Link href={item.href} className="hover:text-secondary transition duration-300 text-gray-400">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-5 h-5 mx-2 text-gray-400" />}
        </div>
      ))}
    </nav>
  );
}
