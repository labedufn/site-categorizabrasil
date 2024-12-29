"use client";

import Link from "next/link";
import { NavLink } from "./nav-link";
import { Icon } from "../ui/icons";
import { motion, AnimatePresence } from "motion/react";
import { SocialLinks } from "../ui/social-links";
import { usePathname } from "next/navigation";
import { Tooltip } from "../ui/tooltip";
import { SocialData } from "@/types/social-data";

interface NavMenuProps extends SocialData {
  isOpen: boolean;
}

interface NavItem {
  href: string;
  label: string;
}

export function NavMenu({ isOpen, instagram, whatsapp, youtubeChannel }: NavMenuProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/noticias", label: "Notícias" },
    { href: "/artigos", label: "Artigos" },
    { href: "/georreferenciamento", label: "Georreferenciamento" },
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
            <NavLink href={item.href} isActive={pathname === item.href}>
              {item.label}
            </NavLink>
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
              <Tooltip content="English information" position="bottom">
                <div className="flex gap-3">
                  <Icon.usFlag className="w-6 h-6" />
                  <span className="lg:hidden">English information</span>
                </div>
              </Tooltip>
            </motion.div>
          </Link>
        </li>
        <div className="h-px w-full lg:w-0.5 lg:h-full self-stretch bg-black/10" />
        <li>
          <SocialLinks
            iconColor="text-primary"
            instagram={instagram}
            whatsapp={whatsapp}
            youtubeChannel={youtubeChannel}
          />
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
