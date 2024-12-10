"use client";

import { footerSections } from "@/constants/footerSections";
import { SocialLinks } from "@/components/ui/social-links";
import { FooterSection } from "@/components/footer/footer-section";
import { FooterCopyright } from "@/components/footer/footer-copyright";
import { Logo } from "@/components/ui/logos";
import Link from "next/link";
import { LayoutDefault } from "@/layouts/layout-default";

export function Footer() {
  return (
    <footer className="relative bg-[url('/background_footer.svg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-primary/70" />
      <LayoutDefault className="relative mx-auto space-y-8 py-16 lg:space-y-16 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <Logo.white className="w-32 h-32 sm:w-40 sm:h-40" />
          </Link>
          <SocialLinks />
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-primary-400 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          {footerSections.map((section) => (
            <FooterSection key={section.title} title={section.title} links={section.links} />
          ))}
        </div>

        <FooterCopyright
          companyName="Categoriza Brasil"
          developerLink={{
            name: "@mauricioprb",
            href: "https://github.com/mauricioprb",
          }}
        />
      </LayoutDefault>
    </footer>
  );
}
