"use client";

import { useState } from "react";
import { FilterDropdown } from "../ui/filter-dropdown";
import { TextSearch } from "../ui/text-search";
import { Pagination } from "../ui/pagination";
import { LayoutDefault } from "@/layouts/layout-default";
import { NewsCard } from "../ui/news-card";
import { Breadcrumb } from "../ui/breadcrumb";

interface NewsItem {
  imageSrc: string;
  title: string;
  date: string;
  url: string;
}

interface NewsSectionProps {
  breadcrumbItems: { label: string; href?: string }[];
  initialNewsItems: NewsItem[];
}

export function NewsSection({ breadcrumbItems, initialNewsItems }: NewsSectionProps) {
  const itemsPerPage = 9;
  const [newsItems, setNewsItems] = useState(initialNewsItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Página atual:", page);
  };

  const handleSortChange = (option: string) => {
    setSortOrder(option);

    const sortedNews = [...newsItems].sort((a, b) => {
      if (option === "Mais recente") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    setNewsItems(sortedNews);
    setCurrentPage(1);
    console.log("Ordenado por:", option);
  };

  const handleSearch = (searchTerm: string) => {
    const filteredNews = initialNewsItems.filter((news) => news.title.toLowerCase().includes(searchTerm.toLowerCase()));

    setNewsItems(filteredNews);
    setCurrentPage(1);
    console.log("Busca por:", searchTerm);
  };

  const currentItems = newsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <LayoutDefault className="mx-auto mb-24">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-8">
        <TextSearch onSubmit={handleSearch} />
        <FilterDropdown
          options={["Mais recente", "Mais antigo"]}
          placeholder="Ordenar por"
          onSortChange={handleSortChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
        {currentItems.map((news, index) => (
          <NewsCard key={index} src={news.imageSrc} title={news.title} date={news.date} url={news.url} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </LayoutDefault>
  );
}
