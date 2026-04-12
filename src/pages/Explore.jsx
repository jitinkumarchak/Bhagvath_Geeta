import React, { useState } from "react";
import { ALL_TOPICS, getVersesByTopic } from "../data/gita";
import VerseCard from "../components/VerseCard";
import { useTheme } from "../App";

export default function Explore() {
  const { dark } = useTheme();
  const [active, setActive] = useState(null);
  const results = active ? getVersesByTopic(active) : [];

  const c = {
    surface: dark ? "#1C1A17" : "#FFFFFF",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "850px", margin: "0 auto", padding: "88px 24px 48px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: c.text, marginBottom: "12px" }}>
          Explore by Topic
        </h1>
        <p style={{ color: c.textSecondary, maxWidth: "420px", margin: "0 auto", lineHeight: 1.7 }}>
          Dive deep into the Gita&apos;s teachings by choosing a theme that speaks to you.
        </p>
      </div>

      {/* Topic cloud */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "40px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.1s forwards", opacity: 0 }}>
        {ALL_TOPICS.map((topic, i) => (
          <button
            key={topic}
            onClick={() => setActive(active === topic ? null : topic)}
            style={{
              fontSize: "0.85rem", padding: "8px 18px", borderRadius: "99px",
              border: `1px solid ${active === topic ? c.gold : c.border}`,
              background: active === topic ? c.gold : c.surface,
              color: active === topic ? "#fff" : c.textSecondary,
              fontWeight: active === topic ? 600 : 400,
              cursor: "pointer", transition: "all 0.25s cubic-bezier(0.22,0.61,0.36,1)",
              transform: active === topic ? "scale(1.05)" : "scale(1)",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (active !== topic) {
                e.currentTarget.style.borderColor = c.borderHover;
                e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
                e.currentTarget.style.color = c.text;
              }
            }}
            onMouseLeave={(e) => {
              if (active !== topic) {
                e.currentTarget.style.borderColor = c.border;
                e.currentTarget.style.background = c.surface;
                e.currentTarget.style.color = c.textSecondary;
              }
            }}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </button>
        ))}
      </div>

      {/* Results */}
      {active && (
        <div style={{ animation: "fadeInUp 0.4s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: c.text, marginBottom: "6px", textTransform: "capitalize" }}>{active}</h2>
          <p style={{ color: c.textMuted, fontSize: "0.85rem", marginBottom: "20px" }}>
            {results.length} {results.length === 1 ? "verse" : "verses"} on this topic
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {results.map((v) => <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />)}
          </div>
        </div>
      )}

      {!active && (
        <p style={{ textAlign: "center", color: c.textMuted }}>
          Select a topic above to see related verses ↑
        </p>
      )}
    </div>
  );
}
