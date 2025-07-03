"use client";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ placeholder = "Search...", onSearch, initialValue = "" }) {
  const [query, setQuery] = useState("");

  // Sync with initialValue prop
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  // Only render on client-side to avoid hydration mismatch
  if (typeof window === "undefined") {
    return (
      <div className="flex items-center w-full bg-white border border-gray-300 rounded-full px-4 py-2 h-[42px]">
        {/* Empty placeholder for SSR */}
      </div>
    );
  }

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
          aria-label="Clear search"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </form>
  );
}