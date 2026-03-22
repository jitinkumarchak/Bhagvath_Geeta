import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMOTIONS, getVersesByEmotion } from "../data/gita";
import VerseCard from "../components/VerseCard";

export default function LifeGuide() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const results = selected ? getVersesByEmotion(selected.key) : [];

  return (
    <div className="page" style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeInUp 0.5s ease" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🧭</div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>Life Guidance</h1>
        <p style={{ color: "var(--color-muted)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.8 }}>
          What are you going through right now? Choose your situation and receive Gita wisdom tailored for you.
        </p>
      </div>

      {/* Emotion grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "0.75rem",
        marginBottom: "3rem",
        animation: "fadeInUp 0.5s ease 0.1s backwards",
      }}>
        {EMOTIONS.map(em => (
          <button
            key={em.key}
            onClick={() => setSelected(selected?.key === em.key ? null : em)}
            style={{
              padding: "1.1rem 0.75rem",
              borderRadius: "var(--radius-md)",
              border: selected?.key === em.key
                ? "1px solid var(--color-gold)"
                : "1px solid var(--color-border)",
              background: selected?.key === em.key
                ? "rgba(245,200,66,0.12)"
                : "var(--color-surface2)",
              color: selected?.key === em.key ? "var(--color-cream)" : "var(--color-text)",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.5rem",
              transform: selected?.key === em.key ? "scale(1.04)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>{em.emoji}</span>
            <span style={{ fontSize: "0.85rem", fontWeight: selected?.key === em.key ? 600 : 400 }}>
              {em.label}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {selected && (
        <div style={{ animation: "fadeInUp 0.4s ease" }}>
          <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{selected.emoji}</span>
            <div>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "0.2rem" }}>
                For {selected.label}
              </h2>
              <p style={{ color: "var(--color-muted)", fontSize: "0.875rem" }}>
                {results.length > 0
                  ? `${results.length} verse${results.length > 1 ? "s" : ""} from the Gita`
                  : "No verses matched — try the AI chat for personalized guidance"}
              </p>
            </div>
          </div>

          {results.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {results.map(v => <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />)}
            </div>
          ) : (
            <div style={{
              textAlign: "center", padding: "3rem",
              border: "1px dashed var(--color-border)", borderRadius: "var(--radius-xl)",
            }}>
              <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
                No verses found for this situation — ask the AI for personalized Gita wisdom.
              </p>
              <button className="btn-primary" onClick={() => navigate("/chat")}>
                ✨ Ask the AI Teacher
              </button>
            </div>
          )}
        </div>
      )}

      {/* CTA when nothing selected */}
      {!selected && (
        <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-muted)" }}>
          <p>Select a feeling above to receive guidance ↑</p>
          <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
            Or{" "}
            <span
              style={{ color: "var(--color-gold)", cursor: "pointer" }}
              onClick={() => navigate("/chat")}
            >
              chat with the AI directly →
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
