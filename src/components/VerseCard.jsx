import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  VerseCard — Sacred Manuscript aesthetic
  ─────────────────────────────────────────
  Design direction: "Aged palm-leaf manuscript meets modern minimalism"
  
  Palette  : Deep parchment bg · warm umber text · antique gold accents
  Type     : Cinzel (labels/headings) · Crimson Text (body/translation) · 
             Noto Serif Devanagari (Sanskrit)
  Motion   : Single entrance animation · smooth height expand · 
             gold shimmer on hover · no jank
  Texture  : Thin ruled lines as paper texture · left-rule for Sanskrit block
  Spacing  : Generous — breath is part of the design
*/

// ─── Inline styles as JS objects for zero external-CSS dependency ─────────────
const tokens = {
  // Colors
  bg:           "#1C0F05",
  bgCard:       "#221408",
  bgSanskrit:   "rgba(212,160,23,0.04)",
  bgCommentary: "rgba(212,160,23,0.05)",
  bgHover:      "#2A1A0A",
  borderCard:   "rgba(212,160,23,0.12)",
  borderSanskrit:"rgba(212,160,23,0.18)",
  borderAccent: "rgba(212,160,23,0.5)",
  gold:         "#C9A84C",
  goldDim:      "rgba(201,168,76,0.65)",
  goldFaint:    "rgba(201,168,76,0.25)",
  text:         "#EDE0C4",
  textMuted:    "rgba(237,224,196,0.55)",
  textFaint:    "rgba(237,224,196,0.35)",
  tagBg:        "rgba(212,160,23,0.10)",
  tagText:      "#C9A84C",
  tagBorder:    "rgba(212,160,23,0.22)",
  btnPrimaryBg: "rgba(180,100,10,0.55)",
  btnPrimaryBorder: "rgba(212,160,23,0.6)",
  btnPrimaryText: "#FDE68A",
  btnGhostBorder: "rgba(237,224,196,0.18)",
  btnGhostText: "rgba(237,224,196,0.6)",

  // Typography
  fontDisplay:  '"Cinzel", "Palatino Linotype", serif',
  fontBody:     '"Crimson Text", Georgia, serif',
  fontSanskrit: '"Noto Serif Devanagari", "Lohit Devanagari", Georgia, serif',

  // Radii
  radiusSm: "4px",
  radiusMd: "8px",
  radiusLg: "12px",

  // Transitions
  transBase: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
  transSlow: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
};

// ─── Keyframe injection (runs once) ──────────────────────────────────────────
let keyframesInjected = false;
function injectKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  keyframesInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Noto+Serif+Devanagari:wght@400;500&display=swap');

    @keyframes verseCardEnter {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes expandIn {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes goldPulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.9; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
  `;
  document.head.appendChild(style);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TopicTag({ label }) {
  return (
    <span style={{
      fontFamily: tokens.fontDisplay,
      fontSize: "0.6rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: tokens.tagText,
      background: tokens.tagBg,
      border: `0.5px solid ${tokens.tagBorder}`,
      borderRadius: "20px",
      padding: "2px 9px",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function VerseLabel({ chapter, verse }) {
  return (
    <span style={{
      fontFamily: tokens.fontDisplay,
      fontSize: "0.65rem",
      letterSpacing: "0.18em",
      color: tokens.gold,
      textTransform: "uppercase",
    }}>
      {chapter}.{verse}
    </span>
  );
}

// Thin horizontal rule with gold center dot
function Divider() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      margin: "0.15rem 0",
    }}>
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${tokens.borderCard})` }} />
      <div style={{
        width: 4, height: 4, borderRadius: "50%",
        background: tokens.goldFaint,
        animation: "goldPulse 3s ease-in-out infinite",
      }} />
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${tokens.borderCard})` }} />
    </div>
  );
}

// Expand / collapse chevron
function Chevron({ open }) {
  return (
    <svg
      width="13" height="13"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        color: tokens.goldDim,
        flexShrink: 0,
      }}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sanskrit block with warm ruled background
function SanskritBlock({ text }) {
  return (
    <div style={{
      position: "relative",
      padding: "1rem 1.1rem",
      background: tokens.bgSanskrit,
      borderRadius: tokens.radiusMd,
      border: `0.5px solid ${tokens.borderSanskrit}`,
      borderLeft: `2.5px solid ${tokens.gold}`,
      overflow: "hidden",
    }}>
      {/* Subtle ruled lines as paper texture */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: `${18 + i * 22}px`, height: "0.5px",
          background: "rgba(212,160,23,0.04)",
          pointerEvents: "none",
        }} />
      ))}
      <p style={{
        fontFamily: tokens.fontSanskrit,
        fontSize: "1.05rem",
        lineHeight: 2,
        textAlign: "center",
        color: "#F5E6C4",
        margin: 0,
        position: "relative",
        zIndex: 1,
      }}>
        {text}
      </p>
    </div>
  );
}

// Animated height wrapper for expand/collapse
function ExpandSection({ open, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return (
    <div style={{
      overflow: "hidden",
      height,
      transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <div ref={ref} style={{
        display: "flex", flexDirection: "column", gap: "0.9rem",
        paddingTop: open ? "0.1rem" : 0,
        animation: open ? "expandIn 0.3s ease" : "none",
      }}>
        {children}
      </div>
    </div>
  );
}

// Action button
function ActionButton({ children, onClick, variant = "primary" }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: tokens.fontDisplay,
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.52rem 1.1rem",
        borderRadius: "20px",
        border: isPrimary
          ? `0.5px solid ${hovered ? tokens.gold : tokens.btnPrimaryBorder}`
          : `0.5px solid ${hovered ? tokens.goldDim : tokens.btnGhostBorder}`,
        background: isPrimary
          ? (hovered ? "rgba(180,100,10,0.8)" : tokens.btnPrimaryBg)
          : (hovered ? "rgba(237,224,196,0.06)" : "transparent"),
        color: isPrimary
          ? tokens.btnPrimaryText
          : (hovered ? tokens.text : tokens.btnGhostText),
        cursor: "pointer",
        transition: tokens.transBase,
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        outline: "none",
      }}
    >
      {children}
    </button>
  );
}

// ─── Main VerseCard ───────────────────────────────────────────────────────────
export default function VerseCard({ verse, compact = false, showAsk = true }) {
  injectKeyframes();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!verse) return null;

  const topics = (verse.topics || []).slice(0, 3);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(p => !p)}
      style={{
        position: "relative",
        padding: compact ? "1.2rem 1.4rem" : "1.75rem 2rem",
        background: hovered ? tokens.bgHover : tokens.bgCard,
        border: `0.5px solid ${hovered ? "rgba(212,160,23,0.25)" : tokens.borderCard}`,
        borderRadius: tokens.radiusLg,
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        cursor: "pointer",
        overflow: "hidden",
        transition: tokens.transSlow,
        animation: "verseCardEnter 0.4s ease both",
        // Subtle lift on hover
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(212,160,23,0.15)"
          : "0 2px 12px rgba(0,0,0,0.35)",
      }}
    >

      {/* ── Ambient glow corner — restrained, non-distracting ── */}
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 200, height: 200, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 65%)",
        transition: "opacity 0.4s ease",
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* ── Top row: verse label · topics · chevron ── */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: "0.5rem", flexWrap: "wrap",
        position: "relative", zIndex: 1,
      }}>
        <VerseLabel chapter={verse.chapter} verse={verse.verse} />

        {/* Thin vertical separator */}
        <div style={{
          width: "0.5px", height: "12px",
          background: tokens.borderCard,
          flexShrink: 0,
        }} />

        {topics.map(t => <TopicTag key={t} label={t} />)}

        <div style={{ marginLeft: "auto", lineHeight: 0 }}>
          <Chevron open={expanded} />
        </div>
      </div>

      {/* ── Sanskrit block (full mode only) ── */}
      {!compact && verse.sanskrit && (
        <div style={{ position: "relative", zIndex: 1 }}>
          <SanskritBlock text={verse.sanskrit} />
        </div>
      )}

      {/* ── Transliteration (expanded) ── */}
      <ExpandSection open={expanded && !!verse.transliteration}>
        <p style={{
          fontFamily: tokens.fontBody,
          color: tokens.goldDim,
          fontStyle: "italic",
          fontSize: "0.88rem",
          lineHeight: 1.9,
          margin: 0,
          paddingLeft: "0.5rem",
          borderLeft: `1.5px solid ${tokens.goldFaint}`,
        }}>
          {verse.transliteration}
        </p>
      </ExpandSection>

      {/* ── Translation — always visible ── */}
      <p style={{
        fontFamily: tokens.fontBody,
        color: tokens.text,
        lineHeight: 1.9,
        fontSize: compact ? "0.92rem" : "1.02rem",
        margin: 0,
        position: "relative", zIndex: 1,
      }}>
        {verse.translation}
      </p>

      {/* ── Commentary (expanded) ── */}
      <ExpandSection open={expanded && !!verse.commentary}>
        <Divider />
        <div style={{
          padding: "0.9rem 1rem",
          background: tokens.bgCommentary,
          borderRadius: tokens.radiusMd,
          borderLeft: `2px solid ${tokens.goldFaint}`,
        }}>
          <p style={{
            fontFamily: tokens.fontBody,
            color: tokens.textMuted,
            fontSize: "0.9rem",
            lineHeight: 1.85,
            margin: 0,
          }}>
            {verse.commentary}
          </p>
        </div>
      </ExpandSection>

      {/* ── Actions ── */}
      {showAsk && (
        <div
          style={{
            display: "flex", gap: "0.6rem",
            marginTop: "0.25rem",
            position: "relative", zIndex: 1,
          }}
          onClick={e => e.stopPropagation()}
        >
          <ActionButton
            variant="primary"
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
          >
            {/* Spark icon */}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0L7.2 4.8H12L8.4 7.8L9.6 12L6 9L2.4 12L3.6 7.8L0 4.8H4.8Z"/>
            </svg>
            Ask AI
          </ActionButton>

          <ActionButton
            variant="ghost"
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
          >
            Read full
            {/* Arrow icon */}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 6h8M7 3l3 3-3 3"/>
            </svg>
          </ActionButton>
        </div>
      )}

    </article>
  );
}