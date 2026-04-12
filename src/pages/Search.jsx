import React, { useState, useMemo } from "react";
import { searchVerses } from "../data/gita";
import VerseCard from "../components/VerseCard";

const SUGGESTIONS = [
  "karma",
  "soul",
  "duty",
  "mind",
  "death",
  "action",
  "surrender",
  "peace",
  "discipline",
];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchVerses(query.trim());
  }, [query]);

  return (
    <div className="min-h-screen pt-16 max-w-[750px] mx-auto px-6 py-10">
      {/* Header */}
      <div
        className="text-center mb-8"
        style={{ animation: "fadeInUp 0.5s ease" }}
      >
        <h1 className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#2D2A26] mb-3">
          Search the Gita
        </h1>
        <p className="text-[#8A8580] max-w-[400px] mx-auto leading-relaxed">
          Search by concept, keyword, emotion, or philosophy
        </p>
      </div>

      {/* Search input */}
      <div
        className="relative mb-5"
        style={{ animation: "fadeInUp 0.5s ease 0.1s backwards" }}
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8ADA0] text-sm pointer-events-none">
          🔍
        </span>
        <input
          className="w-full py-3 pl-10 pr-10 bg-white border border-[#E8E4DF] rounded-xl text-[#2D2A26] text-sm outline-none transition-all duration-300 focus:border-[#B8860B]/30 focus:shadow-[0_0_0_3px_rgba(184,134,11,0.06)] placeholder:text-[#B8ADA0]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search karma, duty, soul, mind..."
          autoFocus
          id="verse-search-input"
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#B8ADA0] text-sm hover:text-[#6B6560]"
            onClick={() => setQuery("")}
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions */}
      {!query && (
        <div
          className="flex gap-2 flex-wrap mb-8"
          style={{ animation: "fadeInUp 0.5s ease 0.15s backwards" }}
        >
          <span className="text-[#8A8580] text-sm w-full mb-1">
            Try searching for:
          </span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="text-sm text-[#6B6560] bg-white border border-[#E8E4DF] rounded-full px-4 py-1.5 cursor-pointer transition-all duration-200 hover:bg-[#F3F0EB] hover:border-[#D4C9BC] hover:text-[#2D2A26]"
              onClick={() => setQuery(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {query.trim().length >= 2 && (
        <p className="text-[#8A8580] text-sm mb-4">
          {results.length > 0
            ? `${results.length} verse${results.length > 1 ? "s" : ""} found for "${query}"`
            : `No verses found for "${query}"`}
        </p>
      )}

      {/* Results */}
      <div className="flex flex-col gap-3">
        {results.map((v) => (
          <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />
        ))}
      </div>

      {/* No results */}
      {query.trim().length >= 2 && results.length === 0 && (
        <div className="text-center py-10 border border-dashed border-[#E8E4DF] rounded-2xl text-[#8A8580]">
          <p className="mb-2">No verses matched your search.</p>
          <p className="text-sm">
            Try simpler keywords like &quot;karma&quot;, &quot;duty&quot;, &quot;soul&quot; or{" "}
            <span
              className="text-[#B8860B] cursor-pointer hover:underline"
              onClick={() => setQuery("")}
            >
              clear the search
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}
