"use client";

import Link from "next/link";

interface FooterCopyrightProps {
  companyName: string;
  developerLink: {
    name: string;
    href: string;
  };
}

export const FooterCopyright = ({ companyName, developerLink }: FooterCopyrightProps) => (
  <div className="flex justify-normal flex-col gap-4 md:justify-between md:flex-row">
    <p className="text-xs text-white">
      &copy; <span className="text-secondary-500 font-bold">{companyName}</span> {new Date().getFullYear()}
    </p>
    <p className="text-xs text-white">
      Desenvolvido por{" "}
      <Link href={developerLink.href} target="blank" className="text-secondary-500">
        {developerLink.name}
      </Link>
    </p>
  </div>
);
