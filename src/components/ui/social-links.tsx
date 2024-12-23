"use client";

import Link from "next/link";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeActions } from "@/app/actions/homeActions";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactElement;
}

interface SocialLinksProps {
  iconColor?: string;
}

export const SocialLinks = ({ iconColor = "text-white" }: SocialLinksProps) => {
  const { data } = useQuery({
    queryKey: ["HomeData"],
    queryFn: fetchHomeActions,
  });

  const socialLinks: SocialLink[] = data
    ? [
        {
          name: "Instagram",
          href: "https://www.instagram.com/" + data.instagram,
          icon: <Icon.instagram className={cn("w-6 h-6", iconColor)} />,
        },
        {
          name: "WhatsApp",
          href: data.whatsapp,
          icon: <Icon.whatsapp className={cn("w-6 h-6", iconColor)} />,
        },
        {
          name: "YouTube",
          href: data.canal_youtube,
          icon: <Icon.youtube className={cn("w-6 h-6", iconColor)} />,
        },
      ]
    : [];

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
