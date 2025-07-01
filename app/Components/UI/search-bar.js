"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ placeholder = "Search...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#00b1a5] transition-all"
    >
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow bg-transparent text-sm sm:text-base placeholder-gray-400 text-gray-800 focus:outline-none"
      />

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </form>
  );
}
