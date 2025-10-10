import { NewsArticle } from "../features/news/news.types";

export const newsFallback: NewsArticle[] = [
  {
    slug: "categorizacao-teste-noticia",
    title: "Categoriza Brasil teste de notícia",
    heroImage: "/background_news.webp",
    gallery: [{ imgSrc: "/background_news.webp" }],
    body: `
Teste de notícia para verificar o fallback do sistema.
`.trim(),
    publishedAt: "2025-08-01T12:00:00.000Z",
    publishedAtLabel: "01/08/2025",
  },
  {
    slug: "categorizacao-programa-expansao",
    title: "Programa de categorização amplia municípios participantes",
    heroImage: "/background_about.webp",
    gallery: [{ imgSrc: "/background_about.webp" }],
    body: `
Novos municípios aderiram ao projeto piloto de categorização em 2025, fortalecendo a cultura de segurança dos alimentos em diferentes regiões do país.

A expansão inclui ações de capacitação, materiais técnicos e integração com as vigilâncias sanitárias locais.
`.trim(),
    publishedAt: "2025-05-15T09:00:00.000Z",
    publishedAtLabel: "15/05/2025",
  },
];
