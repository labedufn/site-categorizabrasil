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
    <nav aria-label="Breadcrumb" className={clsx("flex items-center mb-4 md:mb-8", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center font-medium text-xs md:text-base">
          {item.href ? (
            <Link href={item.href} className="hover:text-secondary transition duration-300 text-gray-400">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary truncate max-w-[120px] md:max-w-none md:overflow-visible md:whitespace-normal md:text-clip">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
        </div>
      ))}
    </nav>
  );
}
