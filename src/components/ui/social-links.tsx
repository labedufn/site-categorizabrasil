"use client";

import { Icon } from "./icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { SocialData } from "@/types/social-data";
import Link from "next/link";

interface SocialLinksProps extends SocialData {
  iconColor?: string;
}

export const SocialLinks = ({ iconColor = "text-white", instagram, whatsapp, youtubeChannel }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/" + instagram,
      icon: <Icon.instagram className={cn("w-6 h-6", iconColor)} />,
    },
    {
      name: "WhatsApp",
      href: whatsapp,
      icon: <Icon.whatsapp className={cn("w-6 h-6", iconColor)} />,
    },
    {
      name: "YouTube",
      href: youtubeChannel,
      icon: <Icon.youtube className={cn("w-6 h-6", iconColor)} />,
    },
  ];

  return (
    <ul className="flex justify-start gap-5 sm:mt-0 sm:justify-end">
      {socialLinks.map((social) => (
        <li key={social.name}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Link
              href={social.href}
              rel="noreferrer"
              target="blank"
              className={cn("tracking-wide transition duration-200", iconColor)}
            >
              <span className="sr-only">{social.name}</span>
              {social.icon}
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
};
