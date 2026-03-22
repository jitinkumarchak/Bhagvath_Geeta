import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerseCard({ verse, compact = false, showAsk = true }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  if (!verse) return null;

  return (
    <div
      className="card"
      style={{
        padding: compact ? "1.25rem" : "2rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        cursor: "pointer", position: "relative", overflow: "hidden",
      }}
      onClick={() => setExpanded(p => !p)}
    >
      {/* Chapter/Verse badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="tag" style={{ fontSize: "0.75rem" }}>
          Ch {verse.chapter} · V {verse.verse}
        </span>
        {verse.topics.slice(0, 2).map(t => (
          <span key={t} className="tag" style={{ fontSize: "0.7rem", marginLeft: "0.4rem" }}>{t}</span>
        ))}
        <span style={{ marginLeft: "auto", color: "var(--color-muted)", fontSize: "0.85rem" }}>
          {expanded ? "▲" : "▼"}
        </span>
      </div>

      {/* Sanskrit */}
      {!compact && (
        <p className="sanskrit" style={{ fontSize: "1rem" }}>{verse.sanskrit}</p>
      )}

      {/* Transliteration */}
      {expanded && (
        <p style={{
          color: "var(--color-gold-dim)", fontStyle: "italic",
          fontSize: "0.85rem", lineHeight: 1.8,
          animation: "fadeInUp 0.3s ease",
        }}>
          {verse.transliteration}
        </p>
      )}

      {/* Translation */}
      <p style={{ color: "var(--color-text)", lineHeight: 1.8, fontSize: compact ? "0.9rem" : "1rem" }}>
        "{verse.translation}"
      </p>

      {/* Commentary */}
      {expanded && verse.commentary && (
        <div style={{
          padding: "1rem",
          background: "rgba(245,200,66,0.05)",
          borderRadius: "var(--radius-md)",
          borderLeft: "3px solid var(--color-gold-dim)",
          animation: "fadeInUp 0.3s ease",
        }}>
          <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>
            💡 {verse.commentary}
          </p>
        </div>
      )}

      {/* Actions */}
      {showAsk && (
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }} onClick={e => e.stopPropagation()}>
          <button
            className="btn-primary"
            style={{ fontSize: "0.8rem", padding: "0.5rem 1.1rem" }}
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
          >
            ✨ Ask AI
          </button>
          <button
            className="btn-ghost"
            style={{ fontSize: "0.8rem", padding: "0.5rem 1.1rem" }}
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
          >
            Read Full →
          </button>
        </div>
      )}

      {/* Glow effect */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "120px", height: "120px",
        background: "radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
