"use client";

import { MobileMenuButton } from "@/components/navigation/mobile-menu-button";
import { NavMenu } from "@/components/navigation/nav-menu";
import { NavOverlay } from "@/components/navigation/nav-overlay";
import { Logo } from "@/components/ui/logos";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { motion } from "motion/react";
import { LayoutDefault } from "@/layouts/layout-default";

export function Navbar() {
  const { isOpen, close, toggle } = useNavigation();

  return (
    <>
      <NavOverlay isVisible={isOpen} onClose={close} />

      <motion.header
        animate={{
          backgroundColor: isOpen ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.6)",
        }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 w-full flex items-center h-24 shadow-sm z-40 backdrop-filter backdrop-blur-xl"
      >
        <LayoutDefault className="mx-auto w-full">
          <nav className="flex gap-x-5 justify-between items-center">
            <Link href="/">
              <Logo.default className="w-28 h-auto" />
            </Link>
            <NavMenu isOpen={isOpen} />
            <div className="flex items-center lg:hidden">
              <MobileMenuButton isOpen={isOpen} onClick={toggle} />
            </div>
          </nav>
        </LayoutDefault>
      </motion.header>
    </>
  );
}
