"use client";

import Link from "next/link";
import { NavLink } from "./nav-link";
import { Icon } from "../ui/icons";
import { motion, AnimatePresence } from "motion/react";
import { SocialLinks } from "../ui/social-links";

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
    { href: "#", label: "Sobre" },
    { href: "#", label: "Notícias" },
    { href: "#", label: "Artigos" },
    { href: "#", label: "Georreferenciamento" },
  ];

  const menuContent = (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-full md:mt-0 left-0 bg-white lg:bg-transparent shadow-sm md:shadow-none py-8 lg:py-0 px-6 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex"
    >
      <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-primary font-medium lg:w-full lg:justify-center">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
        <div className="h-px w-full lg:w-0.5 lg:h-full self-stretch bg-black/10" />
        <li>
          <Link href="#">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Icon.usFlag className="w-6 h-6" />
              <span className="lg:hidden">English</span>
            </motion.div>
          </Link>
        </li>
        <div className="h-px w-full lg:w-0.5 lg:h-full self-stretch bg-black/10" />
        <li>
          <SocialLinks iconColor="text-primary" />
        </li>
      </ul>
    </motion.div>
  );

  return (
    <>
      <div className="hidden lg:block">{menuContent}</div>
      <div className="lg:hidden">
        <AnimatePresence>{isOpen && menuContent}</AnimatePresence>
      </div>
    </>
  );
}
