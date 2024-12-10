"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
}

export function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "relative py-2.5 duration-300 ease-linear hover:text-secondary-500",
        "after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:bg-secondary-500",
        isActive ? "text-secondary-500 after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
      )}
    >
      {children}
    </Link>
  );
}
