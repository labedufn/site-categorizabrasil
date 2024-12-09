"use client";

import Link from "next/link";
import { NavLink } from "./nav-link";
import { Icon } from "../ui/icons";
import { motion } from "motion/react";

interface NavMenuProps {
  isOpen: boolean;
}

interface NavItem {
  href: string;
  label: string;
}

export function NavMenu({ isOpen }: NavMenuProps) {
  const navItems: NavItem[] = [
    { href: "#", label: "Início" },
    { href: "#", label: "Notícias" },
    { href: "#", label: "Artigos" },
    { href: "#", label: "Georreferenciamento" },
  ];

  return (
    <div
      className={`
        absolute top-full mt-2 md:mt-0 left-0 bg-white/60 backdrop-filter backdrop-blur-xl lg:backdrop-blur-none lg:bg-transparent shadow-sm md:shadow-none py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6
        ${isOpen ? "visible opacity-100 translate-y-0" : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"}
      `}
    >
      <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 lg:w-full lg:justify-center">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
        <li>
          <Link href="#">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Icon.usFlag className="w-6 h-6 rounded-full" />
              <span className="lg:hidden">English</span>
            </motion.div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
