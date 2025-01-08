"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, Check } from "lucide-react";

interface ComboBoxProps {
  options: string[];
  placeholder?: string;
  onChange: (selectedOption: string) => void;
}

export const ComboBox: React.FC<ComboBoxProps> = ({ options, placeholder, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between border rounded-lg px-3 h-12 py-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 w-full">
          <span className="text-sm font-medium text-gray-700">
            {selectedOption || placeholder || "Selecione uma opção"}
          </span>
        </div>
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
            <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ul className="max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
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
                ))
              ) : (
                <li className="px-4 text-sm text-center py-8 text-gray-500">Nenhuma opção encontrada.</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
