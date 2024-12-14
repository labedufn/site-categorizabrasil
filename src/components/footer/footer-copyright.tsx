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
      &copy; {new Date().getFullYear()} <span className="font-bold">{companyName}</span>
    </p>
    <p className="text-xs text-white">
      Desenvolvido por{" "}
      <Link
        href={developerLink.href}
        target="blank"
        className="text-secondary-500 font-bold hover:text-secondary-600 tracking-wide transition duration-200"
      >
        {developerLink.name}
      </Link>
    </p>
  </div>
);
