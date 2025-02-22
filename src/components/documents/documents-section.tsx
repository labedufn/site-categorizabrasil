"use client";

import { useState } from "react";
import { FilterDropdown } from "../ui/filter-dropdown";
import { TextSearch } from "../ui/text-search";
import { Pagination } from "../ui/pagination";
import { LayoutDefault } from "@/components/layouts/layout-default";
import { Breadcrumb } from "../ui/breadcrumb";
import { DocumentsCard } from "../ui/documents-card";

interface DocumentsItem {
  title: string;
  url: string;
  date: string;
}

interface DocumentsProps {
  breadcrumbItems: { label: string; href?: string }[];
  initialDocumentsItems: DocumentsItem[];
}

export function DocumentsSection({ breadcrumbItems, initialDocumentsItems }: DocumentsProps) {
  const itemsPerPage = 8;
  const [documentsItems, setDocumentsItems] = useState(initialDocumentsItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSortOrder] = useState<string | null>(null);

  const totalPages = Math.ceil(documentsItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option: string) => {
    setSortOrder(option);

    const sortedDocuments = [...documentsItems].sort((a, b) => {
      if (option === "Mais recente") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    setDocumentsItems(sortedDocuments);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm: string) => {
    const filteredDocuments = initialDocumentsItems.filter((document) =>
      document.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setDocumentsItems(filteredDocuments);
    setCurrentPage(1);
  };

  const currentItems = documentsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
        {currentItems.map((document, index) => (
          <DocumentsCard key={index} {...document} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </LayoutDefault>
  );
}
