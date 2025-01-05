"use client";

import { useState } from "react";
import { Icon } from "./icons";

interface TextSearchProps {
  placeholder?: string;
  onSubmit: (searchTerm: string) => void;
}

export const TextSearch: React.FC<TextSearchProps> = ({ placeholder, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() !== "") {
      onSubmit(value);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center border rounded-lg px-3 h-12 py-2 bg-white transition-all ${
          isFocused ? "border-secondary" : "border-gray-200"
        }`}
      >
        <input
          type="text"
          className="flex-1 outline-none text-sm bg-transparent px-2 placeholder-gray-400"
          placeholder={placeholder || "Digite o que deseja buscar..."}
          value={searchTerm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Icon.search className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};
