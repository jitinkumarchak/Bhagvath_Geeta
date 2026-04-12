import React from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS } from "../data/gita";
import { useTheme } from "../App";

export default function Chapters() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  const c = {
    surface: dark ? "#1C1A17" : "#FFFFFF",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    tagBorder: dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.12)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
    sanskrit: dark ? "#D4B878" : "#5C4020",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "960px", margin: "0 auto", padding: "88px 24px 48px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 600,
          color: c.text, marginBottom: "12px",
        }}>
          The Bhagavad Gita
        </h1>
        <p style={{ color: c.textSecondary, maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
          18 chapters · 700 verses · The eternal dialogue between Arjuna and Krishna
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginBottom: "36px", flexWrap: "wrap" }}>
        {[
          { label: "Chapters", value: "18" },
          { label: "Verses", value: "700" },
          { label: "Yogas", value: "18" },
        ].map((s, i) => (
          <div key={s.label} style={{
            textAlign: "center",
            animation: `fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) ${0.1 + i * 0.1}s forwards`,
            opacity: 0,
          }}>
            <div style={{
              fontSize: "1.8rem", fontWeight: 700,
              fontFamily: "'Cormorant Garamond', serif",
              color: c.gold,
              animation: "breathe 4s ease-in-out infinite",
              animationDelay: `${i * 0.5}s`,
            }}>{s.value}</div>
            <div style={{ color: c.textMuted, fontSize: "0.8rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 3D Book CTA */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <button
          style={{
            background: c.gold, color: "#fff", fontWeight: 500,
            fontSize: "0.9rem", padding: "10px 24px", borderRadius: "99px",
            border: "none", cursor: "pointer", transition: "all 0.3s ease",
          }}
          onClick={() => navigate("/book")}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          📚 Read as 3D Book
        </button>
        <p style={{ color: c.textMuted, fontSize: "0.75rem", marginTop: "8px" }}>
          Flip pages like a real book
        </p>
      </div>

      {/* Chapters grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "12px",
      }}>
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            style={{
              background: c.surface,
              border: `1px solid ${c.border}`,
              borderRadius: "14px",
              padding: "16px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
              animation: `fadeInUp 0.4s cubic-bezier(0.22,0.61,0.36,1) ${i * 0.03}s forwards`,
              opacity: 0,
            }}
            onClick={() => navigate(`/chapter/${ch.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.borderHover;
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = dark
                ? "0 6px 20px rgba(0,0,0,0.3)" : "0 6px 20px rgba(0,0,0,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = c.border;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{
                minWidth: "40px", height: "40px", borderRadius: "10px",
                background: c.goldSoft, border: `1px solid ${c.tagBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                fontSize: "1rem", color: c.gold, flexShrink: 0,
              }}>
                {ch.id}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontWeight: 600,
                  color: c.text, marginBottom: "2px",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {ch.name}
                </h3>
                <p style={{
                  fontFamily: "'Tiro Devanagari Sanskrit', serif",
                  fontSize: "0.75rem", color: c.sanskrit, marginBottom: "4px", opacity: 0.7,
                }}>
                  {ch.sanskrit}
                </p>
                <p style={{ color: c.textMuted, fontSize: "0.78rem", marginBottom: "8px" }}>
                  {ch.meaning}
                </p>
                <span style={{
                  fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: c.gold, background: c.goldSoft,
                  border: `1px solid ${c.tagBorder}`,
                  borderRadius: "20px", padding: "2px 10px",
                }}>
                  {ch.verses} verses
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
