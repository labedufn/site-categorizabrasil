"use client";

import { MobileMenuButton } from "@/components/navigation/mobile-menu-button";
import { NavMenu } from "@/components/navigation/nav-menu";
import { NavOverlay } from "@/components/navigation/nav-overlay";
import { Logo } from "@/components/ui/logos";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export function Navbar() {
  const { isOpen, close, toggle } = useNavigation();

  return (
    <>
      <NavOverlay isVisible={isOpen} onClose={close} />
      <header className="sticky top-0 w-full flex items-center h-24 shadow-sm z-40 bg-white/60 backdrop-filter backdrop-blur-xl">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <Link href="/">
            <Logo.default className="w-28 h-28" />
          </Link>

          <NavMenu isOpen={isOpen} />

          <div className="flex items-center lg:hidden">
            <MobileMenuButton isOpen={isOpen} onClick={toggle} />
          </div>
        </nav>
      </header>
    </>
  );
}
