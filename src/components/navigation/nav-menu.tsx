"use client";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { Icon } from "../ui/icons";
import { motion, AnimatePresence } from "motion/react";

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-full md:mt-0 left-0 bg-white lg:bg-transparent shadow-sm md:shadow-none py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex"
        >
          <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 lg:w-full lg:justify-center">
            {navItems.map((item) => (
              <motion.li
                key={item.label}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <NavLink href={item.href}>{item.label}</NavLink>
              </motion.li>
            ))}
            <motion.li>
              <Link href="#">
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon.usFlag className="w-6 h-6 rounded-full" />
                  <span className="lg:hidden">English</span>
                </motion.div>
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
