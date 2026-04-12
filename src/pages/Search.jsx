import React, { useState, useMemo } from "react";
import { searchVerses } from "../data/gita";
import VerseCard from "../components/VerseCard";
import { useTheme } from "../App";

const SUGGESTIONS = ["karma", "soul", "duty", "mind", "death", "action", "surrender", "peace", "discipline"];

export default function Search() {
  const { dark } = useTheme();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchVerses(query.trim());
  }, [query]);

  const c = {
    surface: dark ? "#1C1A17" : "#FFFFFF",
    surfaceDim: dark ? "#161412" : "#F5F1EC",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    tagBorder: dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.12)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "750px", margin: "0 auto", padding: "88px 24px 48px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: c.text, marginBottom: "12px" }}>Search the Gita</h1>
        <p style={{ color: c.textSecondary, maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>Search by concept, keyword, emotion, or philosophy</p>
      </div>

      {/* Search input */}
      <div style={{ position: "relative", marginBottom: "20px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.1s forwards", opacity: 0 }}>
        <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none", color: c.textMuted }}>🔍</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search karma, duty, soul, mind..." autoFocus id="verse-search-input"
          style={{
            width: "100%", padding: "12px 40px 12px 44px",
            background: c.surface, border: `1px solid ${c.border}`, borderRadius: "14px",
            color: c.text, fontSize: "0.92rem", outline: "none",
            transition: "all 0.3s", fontFamily: "inherit",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = dark ? "rgba(196,154,60,0.3)" : "rgba(160,120,40,0.25)"; e.currentTarget.style.boxShadow = `0 0 0 3px ${dark ? "rgba(196,154,60,0.06)" : "rgba(160,120,40,0.06)"}`; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = "none"; }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: c.textMuted, fontSize: "0.95rem" }}>✕</button>
        )}
      </div>

      {/* Suggestions */}
      {!query && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.15s forwards", opacity: 0 }}>
          <span style={{ color: c.textMuted, fontSize: "0.82rem", width: "100%", marginBottom: "4px" }}>Try searching for:</span>
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => setQuery(s)} style={{
              fontSize: "0.82rem", color: c.textSecondary, background: c.surface,
              border: `1px solid ${c.border}`, borderRadius: "99px",
              padding: "6px 16px", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.color = c.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSecondary; }}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Count */}
      {query.trim().length >= 2 && (
        <p style={{ color: c.textMuted, fontSize: "0.85rem", marginBottom: "16px" }}>
          {results.length > 0 ? `${results.length} verse${results.length > 1 ? "s" : ""} found for "${query}"` : `No verses found for "${query}"`}
        </p>
      )}

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {results.map((v) => <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />)}
      </div>

      {/* No results */}
      {query.trim().length >= 2 && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", border: `1px dashed ${c.border}`, borderRadius: "18px", color: c.textMuted }}>
          <p style={{ marginBottom: "8px" }}>No verses matched your search.</p>
          <p style={{ fontSize: "0.85rem" }}>
            Try simpler keywords like &quot;karma&quot;, &quot;duty&quot;, &quot;soul&quot; or{" "}
            <span onClick={() => setQuery("")} style={{ color: c.gold, cursor: "pointer" }}>clear the search</span>.
          </p>
        </div>
      )}
    </div>
  );
}
