export interface FooterLink {
  label: string;
  href: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

export const FooterSection = ({ title, links }: FooterSectionProps) => (
  <div>
    <p className="font-bold text-gray-100">{title}</p>
    <ul className="mt-6 space-y-4 text-sm">
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-gray-200 transition hover:opacity-75"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);
