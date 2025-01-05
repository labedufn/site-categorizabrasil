"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface FilterDropdownProps {
  options: string[];
  placeholder?: string;
  onSortChange: (sortOption: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  placeholder = "Ordenar por",
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between border rounded-lg px-3 h-12 py-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${selectedOption ? "text-black font-medium" : "text-gray-400 font-normal"}`}>
          {selectedOption || placeholder}
        </span>

        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ul className="max-h-60 overflow-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 ${
                    selectedOption === option ? "font-medium text-secondary" : "text-gray-700"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option}</span>
                  {selectedOption === option && <Check className="w-4 h-4 text-secondary" />}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
