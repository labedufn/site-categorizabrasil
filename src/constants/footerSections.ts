import { FooterLink } from "@/components/footer/footer-section";

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Mapa do Site",
    links: [
      { label: "Início", href: "#" },
      { label: "Notícias", href: "#" },
      { label: "Artigos", href: "#" },
      { label: "Georreferenciamento", href: "#" },
    ],
  },
  {
    title: "Softwares",
    links: [
      { label: "Categoriza Brasil", href: "#" },
      { label: "CSA - Cultura de Segurança dos Alimentos", href: "#" },
      { label: "RSA - Resiliência de Serviços de Alimentação", href: "#" },
    ],
  },
  {
    title: "Documentos Gerais",
    links: [
      { label: "Cartilha Anvisa", href: "#" },
      { label: "Cartilha de Santa Maria", href: "#" },
      { label: "Resumo Executivo Projeto Piloto da Categorização Copa do Mundo FIFA 2014", href: "#" },
      { label: "Relatório Projeto Piloto da Categorização Copa do Mundo FIFA 2014", href: "#" },
    ],
  },
  {
    title: "Links Úteis",
    links: [
      { label: "Nova Iorque", href: "#" },
      { label: "Dinamarca", href: "#" },
      { label: "Los Angeles", href: "#" },
      { label: "Irlanda do Norte, País de Gales e Escócia", href: "#" },
    ],
  },
];
