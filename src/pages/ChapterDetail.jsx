import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapter, getVersesByChapter } from "../data/gita";
import { useTheme } from "../App";

export default function ChapterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dark } = useTheme();
  const chapter = getChapter(id);
  const verses = getVersesByChapter(id);

  const totalVerses = chapter?.verses || 0;
  const verseNums = Array.from({ length: totalVerses }, (_, i) => i + 1);

  const c = {
    surface: dark ? "#1C1A17" : "#FFFFFF",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    goldSofter: dark ? "rgba(196,154,60,0.06)" : "rgba(160,120,40,0.04)",
    tagBorder: dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.12)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
    sanskrit: dark ? "#D4B878" : "#5C4020",
    surfaceHover: dark ? "#252320" : "#F5F1EC",
  };

  if (!chapter) return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", textAlign: "center", padding: "64px" }}>
      <p style={{ color: c.textMuted }}>Chapter not found</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "850px", margin: "0 auto", padding: "88px 24px 48px" }}>
      {/* Back */}
      <button
        onClick={() => navigate("/chapters")}
        style={{ background: "none", border: "none", cursor: "pointer", color: c.gold, marginBottom: "24px", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.9rem" }}
      >
        ← All Chapters
      </button>

      {/* Header */}
      <div style={{ marginBottom: "32px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "4px 14px" }}>
          Chapter {chapter.id}
        </span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: c.text, marginTop: "16px", marginBottom: "6px" }}>
          {chapter.name}
        </h1>
        <p style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: "1rem", color: c.sanskrit, marginBottom: "6px", opacity: 0.7 }}>{chapter.sanskrit}</p>
        <p style={{ color: c.textSecondary }}>{chapter.meaning}</p>
        <div style={{ marginTop: "12px" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "3px 10px" }}>
            {chapter.verses} verses
          </span>
        </div>
      </div>

      <div style={{ height: "1px", background: c.border, margin: "24px 0" }} />

      {/* Key Verses */}
      {verses.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: c.text, marginBottom: "20px" }}>
            Key Verses
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {verses.map((verse, i) => (
              <div
                key={verse.verse}
                style={{
                  background: c.surface, border: `1px solid ${c.border}`, borderRadius: "14px",
                  padding: "20px", cursor: "pointer", transition: "all 0.3s ease",
                  animation: `fadeInUp 0.4s cubic-bezier(0.22,0.61,0.36,1) ${i * 0.05}s forwards`, opacity: 0,
                }}
                onClick={() => navigate(`/verse/${chapter.id}/${verse.verse}`)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = dark ? "0 6px 20px rgba(0,0,0,0.3)" : "0 6px 20px rgba(0,0,0,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "2px 10px" }}>
                    Verse {verse.verse}
                  </span>
                  <span style={{ color: c.textMuted, fontSize: "0.78rem" }}>Read →</span>
                </div>
                <p style={{ color: c.text, lineHeight: 1.7, fontSize: "0.92rem" }}>
                  &quot;{verse.translation.slice(0, 160)}...&quot;
                </p>
                <div style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {verse.topics.slice(0, 3).map((t) => (
                    <span key={t} style={{ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "2px 8px", opacity: 0.7 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Verses grid */}
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: c.text, marginBottom: "20px" }}>All Verses</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))", gap: "8px" }}>
          {verseNums.map((n) => {
            const hasData = verses.some((v) => v.verse === n);
            return (
              <button
                key={n}
                onClick={() => hasData && navigate(`/verse/${chapter.id}/${n}`)}
                style={{
                  padding: "8px", borderRadius: "8px", fontSize: "0.85rem",
                  transition: "all 0.2s",
                  border: `1px solid ${hasData ? c.tagBorder : c.border}`,
                  background: hasData ? c.goldSoft : c.surfaceHover,
                  color: hasData ? c.gold : c.textMuted,
                  fontWeight: hasData ? 600 : 400,
                  cursor: hasData ? "pointer" : "default",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
        <p style={{ color: c.textMuted, fontSize: "0.75rem", marginTop: "12px" }}>
          ✦ Highlighted verses have full AI explanations available
        </p>
      </div>
    </div>
  );
}
