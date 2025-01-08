"use client";

import { Icon } from "./icons";
import { useMediaQuery } from "react-responsive";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const range = isSmallScreen ? 0 : 1;

  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > range + 2) {
        pages.push("...");
      }

      if (isSmallScreen) {
        const start = Math.max(2, currentPage);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      } else {
        const start = Math.max(2, currentPage - range);
        const end = Math.min(totalPages - 1, currentPage + range);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - range - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300 ${
            page === currentPage
              ? "bg-secondary text-white border-secondary"
              : "bg-white text-gray-700 border-secondary hover:bg-primary hover:border-primary hover:text-white"
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-500">
          {page}
        </span>
      ),
    );
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        onClick={handlePrev}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-secondary text-gray-700 text-sm font-medium transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        <Icon.chevronLeft className="w-4 h-4" />
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-secondary text-gray-700 text-sm font-medium transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        <Icon.chevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
