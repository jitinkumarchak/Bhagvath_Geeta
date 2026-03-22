import React, { useState, useMemo } from "react";
import { searchVerses } from "../data/gita";
import VerseCard from "../components/VerseCard";

const SUGGESTIONS = ["karma", "soul", "duty", "mind", "death", "action", "surrender", "peace", "discipline"];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchVerses(query.trim());
  }, [query]);

  return (
    <div className="page" style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem", animation: "fadeInUp 0.5s ease" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>Search the Gita</h1>
        <p style={{ color: "var(--color-muted)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.8 }}>
          Search by concept, keyword, emotion, or philosophy
        </p>
      </div>

      {/* Search input */}
      <div style={{
        position: "relative", marginBottom: "1.5rem",
        animation: "fadeInUp 0.5s ease 0.1s backwards",
      }}>
        <span style={{
          position: "absolute", left: "1.25rem", top: "50%",
          transform: "translateY(-50%)", fontSize: "1.1rem",
          pointerEvents: "none",
        }}>🔍</span>
        <input
          className="input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search karma, duty, soul, mind..."
          autoFocus
          style={{ paddingLeft: "3rem", fontSize: "1rem" }}
          id="verse-search-input"
        />
        {query && (
          <button
            style={{
              position: "absolute", right: "1rem", top: "50%",
              transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: "var(--color-muted)", fontSize: "1rem",
            }}
            onClick={() => setQuery("")}
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions */}
      {!query && (
        <div style={{
          display: "flex", gap: "0.5rem", flexWrap: "wrap",
          marginBottom: "2.5rem",
          animation: "fadeInUp 0.5s ease 0.15s backwards",
        }}>
          <span style={{ color: "var(--color-muted)", fontSize: "0.85rem", width: "100%", marginBottom: "0.3rem" }}>
            Try searching for:
          </span>
          {SUGGESTIONS.map(s => (
            <button key={s} className="tag" onClick={() => setQuery(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {query.trim().length >= 2 && (
        <p style={{
          color: "var(--color-muted)", fontSize: "0.875rem",
          marginBottom: "1.25rem",
        }}>
          {results.length > 0
            ? `${results.length} verse${results.length > 1 ? "s" : ""} found for "${query}"`
            : `No verses found for "${query}"`}
        </p>
      )}

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {results.map(v => (
          <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />
        ))}
      </div>

      {/* No results */}
      {query.trim().length >= 2 && results.length === 0 && (
        <div style={{
          textAlign: "center", padding: "3rem",
          border: "1px dashed var(--color-border)",
          borderRadius: "var(--radius-xl)",
          color: "var(--color-muted)",
        }}>
          <p style={{ marginBottom: "0.5rem" }}>No verses matched your search.</p>
          <p style={{ fontSize: "0.875rem" }}>
            Try simpler keywords like "karma", "duty", "soul" or{" "}
            <span
              style={{ color: "var(--color-gold)", cursor: "pointer" }}
              onClick={() => setQuery("")}
            >
              clear the search
            </span>.
          </p>
        </div>
      )}
    </div>
  );
}
