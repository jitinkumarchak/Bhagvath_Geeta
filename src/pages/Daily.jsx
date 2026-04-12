import React from "react";
import { useNavigate } from "react-router-dom";
import { getDailyVerse, VERSES } from "../data/gita";
import { useTheme } from "../App";

export default function Daily() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const daily = getDailyVerse();

  const dayIndex = VERSES.findIndex((v) => v.chapter === daily.chapter && v.verse === daily.verse);
  const recent = [
    VERSES[(dayIndex - 1 + VERSES.length) % VERSES.length],
    VERSES[(dayIndex - 2 + VERSES.length) % VERSES.length],
  ].filter((v) => v.verse !== daily.verse);

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
    sanskrit: dark ? "#D4B878" : "#5C4020",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "700px", margin: "0 auto", padding: "88px 24px 48px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: c.text, marginBottom: "8px" }}>
          Daily Wisdom
        </h1>
        <p style={{ color: c.textSecondary }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Today's verse */}
      <div style={{
        background: c.surface, border: `1px solid ${c.border}`, borderRadius: "18px",
        padding: "32px", marginBottom: "20px", textAlign: "center",
        animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.1s forwards", opacity: 0,
      }}>
        <span style={{
          display: "inline-flex", padding: "4px 16px",
          background: c.gold, color: "#fff", borderRadius: "99px",
          fontSize: "0.72rem", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.05em",
        }}>
          ✦ Today&apos;s Verse
        </span>

        <p style={{
          fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: "1.05rem",
          lineHeight: 2.2, color: c.sanskrit, marginBottom: "20px",
          animation: "breathe 5s ease-in-out infinite",
        }}>
          {daily.sanskrit}
        </p>

        <div style={{ height: "1px", background: c.border, margin: "20px 0" }} />

        <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: c.text, marginBottom: "16px" }}>
          &quot;{daily.translation}&quot;
        </p>

        <p style={{ color: c.textMuted, fontSize: "0.85rem", marginBottom: "24px" }}>
          — Bhagavad Gita {daily.chapter}.{daily.verse}
        </p>

        {daily.commentary && (
          <div style={{ padding: "16px", background: c.surfaceDim, border: `1px solid ${c.border}`, borderRadius: "12px", textAlign: "left", marginBottom: "20px" }}>
            <p style={{ color: c.textSecondary, fontSize: "0.88rem", lineHeight: 1.8 }}>
              💡 {daily.commentary}
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate(`/verse/${daily.chapter}/${daily.verse}`)} style={{ background: c.gold, color: "#fff", fontWeight: 500, padding: "10px 24px", borderRadius: "99px", border: "none", cursor: "pointer", transition: "all 0.3s", fontSize: "0.85rem" }}>
            ✦ Explore & Ask AI
          </button>
          <button onClick={() => { navigator.clipboard?.writeText(`"${daily.translation}" — Bhagavad Gita ${daily.chapter}.${daily.verse}`); }} style={{ background: "transparent", color: c.textSecondary, padding: "10px 20px", borderRadius: "99px", border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.3s", fontSize: "0.85rem" }}>
            📋 Copy
          </button>
        </div>
      </div>

      {/* Reflection */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: "14px", padding: "20px", marginBottom: "20px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.2s forwards", opacity: 0 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, color: c.text, marginBottom: "8px" }}>
          🧘 Today&apos;s Reflection
        </h3>
        <p style={{ color: c.textSecondary, lineHeight: 1.8, fontSize: "0.9rem" }}>
          Sit quietly for a moment. Read the verse again. Ask yourself:{" "}
          <em style={{ color: c.text }}>&quot;Where in my life today can I apply this teaching?&quot;</em>
        </p>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div style={{ animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.3s forwards", opacity: 0 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: c.text, marginBottom: "16px" }}>
            Recent Verses
          </h2>
          {recent.map((v) => (
            <div key={`${v.chapter}-${v.verse}`} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: "14px", padding: "16px", marginBottom: "10px", cursor: "pointer", transition: "all 0.3s" }}
              onClick={() => navigate(`/verse/${v.chapter}/${v.verse}`)}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.borderHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "2px 10px", marginBottom: "8px", display: "inline-block" }}>
                Ch {v.chapter} · V {v.verse}
              </span>
              <p style={{ color: c.text, fontSize: "0.88rem", lineHeight: 1.7, marginTop: "8px" }}>
                &quot;{v.translation.slice(0, 120)}...&quot;
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
