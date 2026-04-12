import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../App";

/* Animated height wrapper */
function ExpandSection({ open, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return (
    <div style={{ overflow: "hidden", height, transition: "height 0.35s cubic-bezier(0.22,0.61,0.36,1)" }}>
      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: open ? "2px" : 0 }}>
        {children}
      </div>
    </div>
  );
}

export default function VerseCard({ verse, compact = false, showAsk = true }) {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!verse) return null;

  const topics = (verse.topics || []).slice(0, 3);

  const c = {
    bg: dark ? "#1C1A17" : "#FFFFFF",
    bgHover: dark ? "#252320" : "#FAF7F3",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    goldSofter: dark ? "rgba(196,154,60,0.06)" : "rgba(160,120,40,0.04)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
    sanskrit: dark ? "#D4B878" : "#5C4020",
    sanskritBg: dark ? "rgba(196,154,60,0.06)" : "rgba(160,120,40,0.04)",
    tagBg: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.06)",
    tagBorder: dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.12)",
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded((p) => !p)}
      style={{
        position: "relative",
        padding: compact ? "16px 18px" : "20px 24px",
        background: hovered ? c.bgHover : c.bg,
        border: `1px solid ${hovered ? c.borderHover : c.border}`,
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? dark ? "0 8px 24px rgba(0,0,0,0.4)" : "0 6px 20px rgba(0,0,0,0.06)"
          : dark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.03)",
        animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards",
        opacity: 0,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: c.gold,
          fontWeight: 600,
        }}>
          {verse.chapter}.{verse.verse}
        </span>

        <div style={{ width: "1px", height: "12px", background: c.border }} />

        {topics.map((t) => (
          <span key={t} style={{
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: c.gold,
            background: c.tagBg,
            border: `1px solid ${c.tagBorder}`,
            borderRadius: "20px",
            padding: "2px 10px",
            opacity: 0.8,
          }}>
            {t}
          </span>
        ))}

        <div style={{ marginLeft: "auto" }}>
          <svg
            width="13" height="13" viewBox="0 0 12 12" fill="none"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              color: c.textMuted,
            }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Sanskrit */}
      {!compact && verse.sanskrit && (
        <div style={{
          padding: "14px 16px",
          background: c.sanskritBg,
          borderRadius: "10px",
          border: `1px solid ${c.tagBorder}`,
          borderLeft: `3px solid ${c.gold}`,
        }}>
          <p style={{
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            fontSize: "1rem",
            lineHeight: 2,
            textAlign: "center",
            color: c.sanskrit,
            margin: 0,
          }}>
            {verse.sanskrit}
          </p>
        </div>
      )}

      {/* Transliteration (expanded) */}
      <ExpandSection open={expanded && !!verse.transliteration}>
        <p style={{
          color: c.textSecondary,
          fontStyle: "italic",
          fontSize: "0.88rem",
          lineHeight: 1.9,
          margin: 0,
          paddingLeft: "10px",
          borderLeft: `2px solid ${c.tagBorder}`,
        }}>
          {verse.transliteration}
        </p>
      </ExpandSection>

      {/* Translation */}
      <p style={{
        color: c.text,
        lineHeight: 1.85,
        fontSize: compact ? "0.92rem" : "0.98rem",
        margin: 0,
      }}>
        {verse.translation}
      </p>

      {/* Commentary (expanded) */}
      <ExpandSection open={expanded && !!verse.commentary}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", margin: "4px 0",
        }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${c.border})` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: c.textMuted, animation: "breathe 3s ease-in-out infinite" }} />
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${c.border})` }} />
        </div>
        <div style={{
          padding: "12px 14px",
          background: c.goldSofter,
          borderRadius: "10px",
          borderLeft: `2px solid ${c.tagBorder}`,
        }}>
          <p style={{ color: c.textSecondary, fontSize: "0.9rem", lineHeight: 1.85, margin: 0 }}>
            {verse.commentary}
          </p>
        </div>
      </ExpandSection>

      {/* Actions */}
      {showAsk && (
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRadius: "20px",
              border: `1px solid ${c.tagBorder}`,
              background: c.goldSoft,
              color: c.gold,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.14)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = c.goldSoft; }}
          >
            ✦ Ask AI
          </button>
          <button
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRadius: "20px",
              border: `1px solid ${c.border}`,
              background: "transparent",
              color: c.textMuted,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
              e.currentTarget.style.color = c.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = c.textMuted;
            }}
          >
            Read full →
          </button>
        </div>
      )}
    </article>
  );
}