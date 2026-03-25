import React from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS } from "../data/gita";

export default function Chapters() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeInUp 0.5s ease" }}>
        <div className="anim-float" style={{ fontSize: "3rem", marginBottom: "1.2rem", display: "inline-block" }}>📖</div>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>The Bhagavad Gita</h1>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.8 }}>
          18 chapters · 700 verses · The eternal dialogue between Arjuna and Krishna
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "3rem",
        marginBottom: "3rem", flexWrap: "wrap",
      }}>
        {[
          { label: "Chapters", value: "18" },
          { label: "Verses",   value: "700" },
          { label: "Yogas",    value: "18" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-display)",
              background: "var(--grad-gold)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{s.value}</div>
            <div style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* 3D Book CTA */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <button
          className="btn-primary"
          style={{ fontSize: "1rem", padding: "0.75rem 2.2rem" }}
          onClick={() => navigate("/book")}
        >
          📚 Read as 3D Book
        </button>
        <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Flip pages like a real book
        </p>
      </div>

      {/* Chapters grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}>
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            className="card"
            style={{
              padding: "1.5rem",
              cursor: "pointer",
              animation: `fadeInUp 0.4s ease ${i * 0.04}s backwards`,
            }}
            onClick={() => navigate(`/chapter/${ch.id}`)}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              {/* Chapter number badge */}
              <div style={{
                minWidth: "44px", height: "44px",
                borderRadius: "var(--radius-sm)",
                background: `${ch.color}18`,
                border: `1px solid ${ch.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "1.1rem", color: ch.color,
                flexShrink: 0,
              }}>
                {ch.id}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "0.95rem",
                  color: "var(--color-cream)", marginBottom: "0.2rem",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {ch.name}
                </h3>
                <p className="sanskrit" style={{ fontSize: "0.8rem", margin: "0 0 0.4rem" }}>
                  {ch.sanskrit}
                </p>
                <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginBottom: "0.6rem" }}>
                  {ch.meaning}
                </p>
                <span className="tag" style={{ fontSize: "0.7rem" }}>{ch.verses} verses</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
