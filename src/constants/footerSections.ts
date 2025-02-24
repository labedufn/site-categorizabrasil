import { FooterLink } from "@/components/footer/footer-section";

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Mapa do Site",
    links: [
      { label: "Início", href: "/" },
      { label: "Notícias", href: "/noticias" },
      { label: "Artigos", href: "/publicacoes/artigos" },
      { label: "Documentos Úteis", href: "/publicacoes/documentos" },
      { label: "Georreferenciamento", href: "/georreferenciamento" },
    ],
  },
  {
    title: "Softwares",
    links: [
      { label: "Categoriza Brasil", href: "https://categoriza.categorizabrasil.com.br" },
      { label: "CSA - Cultura de Segurança dos Alimentos", href: "https://cultura.categorizabrasil.com.br" },
      { label: "RSA - Resiliência de Serviços de Alimentação", href: "https://resiliencia.categorizabrasil.com.br" },
    ],
  },
  {
    title: "Documentos Gerais",
    links: [
      { label: "Cartilha Anvisa", href: "https://drive.google.com/file/d/1pNac8jzmsexlgEaAE64oSGaGQ8i9vzU_/view" },
      {
        label: "Cartilha de Santa Maria",
        href: "https://drive.google.com/file/d/1ZojLyk7yMPEImAWLgDBfeZVsEKkQ7OA_/view",
      },
      {
        label: "Resumo Executivo Projeto Piloto da Categorização Copa do Mundo FIFA 2014",
        href: "https://drive.google.com/file/d/1r9ffFtgRnmyQloo4rvCc1nXQi7fbGsK2/view",
      },
      {
        label: "Relatório Projeto Piloto da Categorização Copa do Mundo FIFA 2014",
        href: "https://drive.google.com/file/d/1O-PqtkcCZIlm6nQxOzHWKGbM8JK67cDn/view",
      },
    ],
  },
  {
    title: "Links Úteis",
    links: [
      { label: "Nova Iorque", href: "https://www.nyc.gov/site/doh/services/restaurant-grades.page" },
      { label: "Dinamarca", href: "https://www.findsmiley.dk/Sider/Forside.aspx" },
      {
        label: "Los Angeles",
        href: "http://ph.lacounty.gov/eh/inspection/grading-posting-requirements-retail-food-facilities.htm",
      },
      { label: "Irlanda do Norte, País de Gales e Escócia", href: "https://ratings.food.gov.uk" },
    ],
  },
];
