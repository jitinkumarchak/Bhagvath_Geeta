import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  VerseCard — Minimalist, calm, soothing design
  ─────────────────────────────────────────────
  Warm white card · soft borders · Cormorant headings
  Manrope body · Tiro Devanagari Sanskrit · gentle expand
*/

// Animated height wrapper
function ExpandSection({ open, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      className="overflow-hidden transition-[height] duration-300 ease-in-out"
      style={{ height }}
    >
      <div ref={ref} className="flex flex-col gap-3 pt-0.5">
        {children}
      </div>
    </div>
  );
}

export default function VerseCard({ verse, compact = false, showAsk = true }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  if (!verse) return null;

  const topics = (verse.topics || []).slice(0, 3);

  return (
    <article
      onClick={() => setExpanded((p) => !p)}
      className={`
        relative bg-white border border-[#E8E4DF] rounded-xl
        flex flex-col cursor-pointer overflow-hidden
        transition-all duration-300 ease-in-out
        hover:border-[#D4C9BC] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        ${compact ? "p-4" : "p-5 sm:p-6"}
      `}
      style={{ animation: "fadeInUp 0.4s ease both" }}
    >
      {/* Top row: verse label · topics · chevron */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="font-['Cormorant_Garamond',serif] text-xs tracking-[0.15em] uppercase text-[#B8860B] font-semibold">
          {verse.chapter}.{verse.verse}
        </span>

        <div className="w-px h-3 bg-[#E8E4DF]" />

        {topics.map((t) => (
          <span
            key={t}
            className="text-[0.65rem] tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-2 py-0.5"
          >
            {t}
          </span>
        ))}

        <div className="ml-auto">
          <svg
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-300 text-[#B8ADA0] ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Sanskrit block */}
      {!compact && verse.sanskrit && (
        <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E4DF] border-l-[2.5px] border-l-[#B8860B]/40 mb-3">
          <p className="font-['Tiro_Devanagari_Sanskrit',serif] text-base leading-[2] text-center text-[#6B4E2F] m-0">
            {verse.sanskrit}
          </p>
        </div>
      )}

      {/* Transliteration (expanded) */}
      <ExpandSection open={expanded && !!verse.transliteration}>
        <p className="text-sm italic text-[#B8860B]/60 leading-relaxed pl-2 border-l-[1.5px] border-[#B8860B]/20 m-0">
          {verse.transliteration}
        </p>
      </ExpandSection>

      {/* Translation — always visible */}
      <p
        className={`text-[#2D2A26] leading-[1.85] m-0 ${
          compact ? "text-[0.92rem]" : "text-base"
        }`}
      >
        {verse.translation}
      </p>

      {/* Commentary (expanded) */}
      <ExpandSection open={expanded && !!verse.commentary}>
        {/* Subtle divider */}
        <div className="flex items-center gap-2.5 my-1">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8E4DF]" />
          <div className="w-1 h-1 rounded-full bg-[#D4C9BC]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E8E4DF]" />
        </div>
        <div className="p-3.5 bg-[#FAF8F5] rounded-lg border-l-2 border-[#B8860B]/20">
          <p className="text-sm text-[#8A8580] leading-[1.85] m-0">
            {verse.commentary}
          </p>
        </div>
      </ExpandSection>

      {/* Actions */}
      {showAsk && (
        <div
          className="flex gap-2 mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
            className="font-['Cormorant_Garamond',serif] text-[0.7rem] tracking-[0.1em] uppercase py-2 px-4 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/8 text-[#B8860B] cursor-pointer transition-all duration-200 hover:bg-[#B8860B]/15 hover:border-[#B8860B]/50 inline-flex items-center gap-1.5"
          >
            ✦ Ask AI
          </button>
          <button
            onClick={() => navigate(`/verse/${verse.chapter}/${verse.verse}`)}
            className="font-['Cormorant_Garamond',serif] text-[0.7rem] tracking-[0.1em] uppercase py-2 px-4 rounded-full border border-[#E8E4DF] bg-transparent text-[#8A8580] cursor-pointer transition-all duration-200 hover:bg-[#F0EDE8] hover:text-[#2D2A26] inline-flex items-center gap-1.5"
          >
            Read full →
          </button>
        </div>
      )}
    </article>
  );
}