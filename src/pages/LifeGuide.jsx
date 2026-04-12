import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMOTIONS, getVersesByEmotion } from "../data/gita";
import VerseCard from "../components/VerseCard";
import { useTheme } from "../App";

export default function LifeGuide() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [selected, setSelected] = useState(null);

  const results = selected ? getVersesByEmotion(selected.key) : [];

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
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "850px", margin: "0 auto", padding: "88px 24px 48px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: c.text, marginBottom: "12px" }}>Life Guidance</h1>
        <p style={{ color: c.textSecondary, maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
          What are you going through right now? Choose your situation and receive Gita wisdom tailored for you.
        </p>
      </div>

      {/* Emotions */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: "10px", marginBottom: "40px",
        animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) 0.1s forwards", opacity: 0,
      }}>
        {EMOTIONS.map((em, i) => {
          const isActive = selected?.key === em.key;
          return (
            <button
              key={em.key}
              onClick={() => setSelected(isActive ? null : em)}
              style={{
                padding: "16px 10px", borderRadius: "14px",
                border: `1px solid ${isActive ? c.gold : c.border}`,
                background: isActive ? c.goldSoft : c.surface,
                color: isActive ? c.text : c.textSecondary,
                cursor: "pointer", transition: "all 0.25s cubic-bezier(0.22,0.61,0.36,1)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                transform: isActive ? "scale(1.04)" : "scale(1)",
                animation: `fadeInUp 0.4s cubic-bezier(0.22,0.61,0.36,1) ${i * 0.03}s forwards`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = c.borderHover;
                  e.currentTarget.style.transform = "scale(1.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              <span style={{ fontSize: "1.6rem", animation: isActive ? "float 3s ease-in-out infinite" : "none" }}>{em.emoji}</span>
              <span style={{ fontSize: "0.82rem", fontWeight: isActive ? 600 : 400 }}>{em.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {selected && (
        <div style={{ animation: "fadeInUp 0.4s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "1.5rem" }}>{selected.emoji}</span>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: c.text, marginBottom: "2px" }}>For {selected.label}</h2>
              <p style={{ color: c.textMuted, fontSize: "0.85rem" }}>
                {results.length > 0
                  ? `${results.length} verse${results.length > 1 ? "s" : ""} from the Gita`
                  : "No verses matched — try the AI chat for personalized guidance"}
              </p>
            </div>
          </div>

          {results.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {results.map((v) => <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px", border: `1px dashed ${c.border}`, borderRadius: "18px" }}>
              <p style={{ color: c.textMuted, marginBottom: "20px" }}>No verses found — ask the AI for personalized Gita wisdom.</p>
              <button onClick={() => navigate("/chat")} style={{ background: c.gold, color: "#fff", fontWeight: 500, padding: "10px 24px", borderRadius: "99px", border: "none", cursor: "pointer", transition: "all 0.3s", fontSize: "0.85rem" }}>
                ✦ Ask the AI Teacher
              </button>
            </div>
          )}
        </div>
      )}

      {!selected && (
        <div style={{ textAlign: "center", padding: "24px", color: c.textMuted }}>
          <p>Select a feeling above to receive guidance ↑</p>
          <p style={{ marginTop: "12px", fontSize: "0.85rem" }}>
            Or{" "}
            <span onClick={() => navigate("/chat")} style={{ color: c.gold, cursor: "pointer" }}>chat with the AI directly →</span>
          </p>
        </div>
      )}
    </div>
  );
}
