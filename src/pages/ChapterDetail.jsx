import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapter, getVersesByChapter, VERSES } from "../data/gita";

export default function ChapterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chapter = getChapter(id);
  const verses = getVersesByChapter(id);

  // Build full verse list (numbers only for ones without data)
  const totalVerses = chapter?.verses || 0;
  const verseNums = Array.from({ length: totalVerses }, (_, i) => i + 1);

  if (!chapter) return (
    <div className="page" style={{ textAlign: "center", padding: "4rem" }}>
      <p style={{ color: "var(--color-muted)" }}>Chapter not found</p>
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Back */}
      <button
        onClick={() => navigate("/chapters")}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-gold)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
      >
        ← All Chapters
      </button>

      {/* Chapter header */}
      <div style={{ marginBottom: "3rem", animation: "fadeInUp 0.5s ease" }}>
        <span className="tag" style={{ marginBottom: "1rem" }}>Chapter {chapter.id}</span>
        <h1 style={{ fontSize: "2.2rem", margin: "0.75rem 0 0.4rem" }}>{chapter.name}</h1>
        <p className="sanskrit" style={{ marginBottom: "0.5rem" }}>{chapter.sanskrit}</p>
        <p style={{ color: "var(--color-muted)" }}>{chapter.meaning}</p>
        <div style={{ marginTop: "1rem" }}>
          <span className="tag">{chapter.verses} verses</span>
        </div>
      </div>

      <div className="divider" />

      {/* Verses with data */}
      {verses.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "var(--color-cream)" }}>
            ✨ Key Verses
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {verses.map(verse => (
              <div
                key={verse.verse}
                className="card"
                style={{ padding: "1.5rem", cursor: "pointer" }}
                onClick={() => navigate(`/verse/${chapter.id}/${verse.verse}`)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <span className="tag">Verse {verse.verse}</span>
                  <span style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}>Read →</span>
                </div>
                <p style={{ color: "var(--color-text)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  "{verse.translation.slice(0, 160)}..."
                </p>
                <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {verse.topics.slice(0, 3).map(t => (
                    <span key={t} className="tag" style={{ fontSize: "0.7rem" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All verse numbers */}
      <div>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "var(--color-cream)" }}>
          All Verses
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: "0.6rem",
        }}>
          {verseNums.map(n => {
            const hasData = verses.some(v => v.verse === n);
            return (
              <button
                key={n}
                onClick={() => hasData && navigate(`/verse/${chapter.id}/${n}`)}
                style={{
                  padding: "0.6rem",
                  borderRadius: "var(--radius-sm)",
                  border: hasData ? "1px solid var(--color-border-hover)" : "1px solid var(--color-border)",
                  background: hasData ? "rgba(229,235,131,0.07)" : "var(--color-surface2)",
                  color: hasData ? "var(--color-gold)" : "var(--color-muted)",
                  cursor: hasData ? "pointer" : "default",
                  fontWeight: hasData ? 600 : 400,
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => hasData && (e.currentTarget.style.background = "rgba(229,235,131,0.15)")}
                onMouseLeave={e => hasData && (e.currentTarget.style.background = "rgba(229,235,131,0.07)")}
              >
                {n}
              </button>
            );
          })}
        </div>
        <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginTop: "1rem" }}>
          ✨ Highlighted verses have full AI explanations available
        </p>
      </div>
    </div>
  );
}
