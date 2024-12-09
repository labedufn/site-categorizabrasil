"use client";

import Link from "next/link";
import { Icon } from "../ui/icons";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactElement;
}

export const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      href: "#",
      icon: <Icon.instagram className="w-6 h-6" />,
    },

    {
      name: "WhatsApp",
      href: "#",
      icon: <Icon.whatsapp className="w-6 h-6" />,
    },

    {
      name: "YouTube",
      href: "#",
      icon: <Icon.youtube className="w-6 h-6" />,
    },
  ];

  return (
    <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
      {socialLinks.map((social) => (
        <li key={social.name}>
          <Link
            href={social.href}
            rel="noreferrer"
            target="blank"
            className="text-white tracking-wide transition duration-200 hover:text-gray-200"
          >
            <span className="sr-only">{social.name}</span>
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};
