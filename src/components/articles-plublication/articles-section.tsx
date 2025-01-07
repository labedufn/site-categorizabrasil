"use client";

import { useState } from "react";
import { FilterDropdown } from "../ui/filter-dropdown";
import { TextSearch } from "../ui/text-search";
import { Pagination } from "../ui/pagination";
import { LayoutDefault } from "@/layouts/layout-default";
import { Breadcrumb } from "../ui/breadcrumb";
import { ArticlesCard } from "../ui/articles-card";

interface ArticlesItem {
  title: string;
  resume: string;
  authors: string[];
  date: string;
  url: string;
}

interface ArticlesSectionProps {
  breadcrumbItems: { label: string; href?: string }[];
  initialArticlesItems: ArticlesItem[];
}

export function ArticlesSection({ breadcrumbItems, initialArticlesItems }: ArticlesSectionProps) {
  const itemsPerPage = 8;
  const [articlesItems, setArticlesItems] = useState(initialArticlesItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSortOrder] = useState<string | null>(null);

  const totalPages = Math.ceil(articlesItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option: string) => {
    setSortOrder(option);

    const sortedArticles = [...articlesItems].sort((a, b) => {
      if (option === "Mais recente") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    setArticlesItems(sortedArticles);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm: string) => {
    const filteredNews = initialArticlesItems.filter((articles) =>
      articles.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setArticlesItems(filteredNews);
    setCurrentPage(1);
  };

  const currentItems = articlesItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <LayoutDefault className="mx-auto mb-24">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <TextSearch onSubmit={handleSearch} />
        <FilterDropdown
          options={["Mais recente", "Mais antigo"]}
          placeholder="Ordenar por"
          onSortChange={handleSortChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
        {currentItems.map((articles, index) => (
          <ArticlesCard
            key={index}
            title={articles.title}
            date={articles.date}
            url={articles.url}
            resume={articles.resume}
            authors={articles.authors.join(", ")}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </LayoutDefault>
  );
}
