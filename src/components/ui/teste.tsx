"use client";

import React, { useState } from "react";
import { FilterDropdown } from "./filter-dropdown";
import { TextSearch } from "./text-search";
import { Pagination } from "./pagination";
import { LayoutDefault } from "@/layouts/layout-default";
import { NewsCard } from "./news-card";

export const Teste: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 50;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Página atual:", page);
  };

  const handleSortChange = (option: string) => {
    console.log("Ordenar por:", option);
    setSortOrder(option);
  };

  return (
    <>
      <LayoutDefault className="mx-auto mb-24">
        <div className="flex gap-6 flex-col md:flex-row">
          <TextSearch
            onSubmit={function (searchTerm: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <FilterDropdown
            options={["Mais recente", "Mais antigo"]}
            placeholder="Ordenar por"
            onSortChange={handleSortChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          <NewsCard
            src={"/background_news.webp"}
            title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"}
            date={"00/00/0000"}
            url={"/publicacoes"}
          />
          <NewsCard
            src={"/background_news.webp"}
            title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"}
            date={"00/00/0000"}
            url={""}
          />
          <NewsCard
            src={"/background_news.webp"}
            title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"}
            date={"00/00/0000"}
            url={""}
          />
          <NewsCard
            src={"/background_news.webp"}
            title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"}
            date={"00/00/0000"}
            url={""}
          />
          <NewsCard
            src={"/background_news.webp"}
            title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"}
            date={"00/00/0000"}
            url={""}
          />
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </LayoutDefault>
    </>
  );
};
