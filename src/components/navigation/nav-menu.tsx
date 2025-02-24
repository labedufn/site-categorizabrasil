"use client";

import { useState } from "react";
import { NavLink } from "./nav-link";
import { Icon } from "../ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { SocialLinks } from "../ui/social-links";
import { usePathname } from "next/navigation";
import { Tooltip } from "../ui/tooltip";
import { SocialData } from "@/types/social-data";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

interface NavMenuProps extends SocialData {
  isOpen: boolean;
}

interface NavItem {
  href?: string;
  label: string;
  subItems?: {
    label: string;
    href: string;
  }[];
}

export function NavMenu({ isOpen, instagram, whatsapp, youtubeChannel }: NavMenuProps) {
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/noticias", label: "Notícias" },
    {
      label: "Publicações",
      subItems: [
        { href: "/publicacoes/artigos", label: "Artigos" },
        { href: "/publicacoes/documentos", label: "Documentos Úteis" },
      ],
    },
    { href: "/georreferenciamento", label: "Georreferenciamento" },
    {
      label: "Softwares",
      subItems: [
        { href: "https://categoriza.categorizabrasil.com.br", label: "Categoriza Brasil" },
        { href: "https://csa.categorizabrasil.com.br", label: "CSA - Cultura de Segurança dos Alimentos" },
        { href: "https://rsa.categorizabrasil.com.br", label: "RSA - Resiliência de Serviços de Alimentação" },
      ],
    },
  ];

  function renderNavItem(item: NavItem) {
    const isActive = pathname === item.href;

    if (item.subItems) {
      if (isMobile) {
        // Mobile: o submenu é aberto/fechado ao clicar
        return (
          <li key={item.label} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpenSubMenu((prev) => (prev === item.label ? null : item.label))}
            >
              <span className={`py-2.5 duration-300 ease-linear ${isActive ? "text-secondary-500" : "text-primary"}`}>
                {item.label}
              </span>
              <Icon.chevronDown
                className={`w-4 h-4 transition-transform ${openSubMenu === item.label ? "rotate-180" : ""}`}
              />
            </div>
            <AnimatePresence>
              {openSubMenu === item.label && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 pl-4 border-l border-gray-200"
                >
                  {item.subItems.map((sub) => {
                    const subIsActive = pathname === sub.href;
                    return (
                      <li key={sub.label} className="py-2">
                        <NavLink href={sub.href} isActive={subIsActive} removeHoverLine>
                          {sub.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        );
      } else {
        // Desktop: o submenu aparece ao passar o mouse com animação
        // e o item muda a cor via group-hover
        return (
          <li
            key={item.label}
            className="relative group"
            onMouseEnter={() => setOpenSubMenu(item.label)}
            onMouseLeave={() => setOpenSubMenu(null)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <span
                className={`py-2.5 duration-300 ease-linear ${
                  isActive ? "text-secondary-500" : "text-primary group-hover:text-secondary-500"
                }`}
              >
                {item.label}
              </span>
              <Icon.chevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-hover:text-secondary-500" />
            </div>
            <AnimatePresence>
              {openSubMenu === item.label && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 mt-0 w-72 bg-white shadow-sm rounded-xl border p-3 border-gray-200 z-50"
                >
                  {item.subItems.map((sub) => {
                    const subIsActive = pathname === sub.href;
                    return (
                      <li key={sub.label} className="border-b last:border-b-0 p-2">
                        <NavLink href={sub.href} isActive={subIsActive} removeHoverLine>
                          {sub.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        );
      }
    }

    if (item.href) {
      return (
        <li key={item.label}>
          <NavLink href={item.href} isActive={isActive}>
            {item.label}
          </NavLink>
        </li>
      );
    }
    return null;
  }

  const menuContent = (
    <motion.div
      initial={isMobile ? { y: -20, opacity: 0 } : { opacity: 1 }}
      animate={isMobile ? { y: 0, opacity: 1 } : { opacity: 1 }}
      exit={isMobile ? { y: -20, opacity: 0 } : undefined}
      transition={isMobile ? { duration: 0.3, ease: "easeOut" } : undefined}
      className="absolute top-full md:mt-0 left-0 bg-white lg:bg-transparent shadow-sm md:shadow-none py-8 lg:py-0 px-6 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex"
    >
      <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-primary font-medium lg:w-full lg:justify-center">
        {navItems.map(renderNavItem)}

        <div className="h-px w-full lg:w-0.5 lg:h-full self-stretch bg-black/10" />

        <li>
          <Link href="/english">
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
      {/* Menu Desktop */}
      <div className="hidden lg:block">{menuContent}</div>

      {/* Menu Mobile */}
      <div className="lg:hidden">
        <AnimatePresence>{isOpen && menuContent}</AnimatePresence>
      </div>
    </>
  );
}
