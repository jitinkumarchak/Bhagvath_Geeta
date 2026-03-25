import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS, getVersesByChapter, VERSES } from "../data/gita";
import ThreeBook from "../components/ThreeBook";

// Build a flat list of all "pages" in reading order
// Each page = { type, chapter, verse?, chapterObj }
function buildPages() {
  const pages = [];
  // Cover page
  pages.push({ type: "cover" });
  for (const chapter of CHAPTERS) {
    // Chapter title page
    pages.push({
      type: "chapter-title",
      chapter: chapter.id,
      chapterObj: chapter,
    });
    // Verse pages for this chapter
    const verses = getVersesByChapter(chapter.id);
    for (const v of verses) {
      pages.push({
        type: "verse",
        chapter: v.chapter,
        verse: v,
        chapterObj: chapter,
      });
    }
    // If no verses in data, add a placeholder
    if (verses.length === 0) {
      pages.push({
        type: "placeholder",
        chapter: chapter.id,
        chapterObj: chapter,
      });
    }
  }
  // Back cover
  pages.push({ type: "back-cover" });
  return pages;
}

const ALL_PAGES = buildPages();
const TOTAL_PAGES = ALL_PAGES.length;

// ── Page Content Renderers ──────────────────────────────────────────────────

function CoverPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, #1a0e02 0%, #0d0a00 40%, #1a0800 100%)",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ornamental border */}
      <div
        style={{
          position: "absolute",
          inset: "12px",
          border: "1px solid rgba(245,200,66,0.3)",
          borderRadius: "4px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "18px",
          border: "1px solid rgba(245,200,66,0.12)",
          borderRadius: "2px",
          pointerEvents: "none",
        }}
      />

      {/* Gold pattern top */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(245,200,66,0.4)",
          fontSize: "1.2rem",
          letterSpacing: "1rem",
        }}
      >
        ✦ ✦ ✦
      </div>

      <div
        style={{
          fontSize: "4rem",
          marginBottom: "1.2rem",
          filter: "drop-shadow(0 0 20px rgba(245,200,66,0.5))",
        }}
      >
        🕉️
      </div>
      <h1
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "1.9rem",
          fontWeight: 700,
          color: "#f5c842",
          lineHeight: 1.3,
          marginBottom: "0.75rem",
          textShadow: "0 0 30px rgba(245,200,66,0.4)",
        }}
      >
        Bhagavad Gita
      </h1>
      <p
        style={{
          fontFamily: "'Tiro Devanagari Sanskrit', serif",
          fontSize: "1.1rem",
          color: "rgba(245,200,66,0.7)",
          marginBottom: "1.5rem",
        }}
      >
        श्रीमद् भगवद्गीता
      </p>
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "linear-gradient(90deg,transparent,#f5c842,transparent)",
          marginBottom: "1.2rem",
        }}
      />
      <p
        style={{
          color: "rgba(245,200,66,0.5)",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        The Song of God
      </p>
      <p
        style={{
          color: "rgba(200,160,60,0.4)",
          fontSize: "0.72rem",
          marginTop: "0.5rem",
        }}
      >
        18 Chapters · 700 Verses
      </p>

      {/* Bottom ornament */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(245,200,66,0.4)",
          fontSize: "1.2rem",
          letterSpacing: "1rem",
        }}
      >
        ✦ ✦ ✦
      </div>
    </div>
  );
}

function BackCoverPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, #1a0e02 0%, #0d0a00 60%, #1a0800 100%)",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "12px",
          border: "1px solid rgba(245,200,66,0.25)",
          borderRadius: "4px",
        }}
      />
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🕉️</div>
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          color: "rgba(245,200,66,0.6)",
          fontSize: "0.85rem",
          letterSpacing: "0.1em",
        }}
      >
        End of the Gita
      </p>
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "rgba(245,200,66,0.3)",
          margin: "1rem auto",
        }}
      />
      <p
        style={{
          fontFamily: "'Tiro Devanagari Sanskrit', serif",
          color: "rgba(245,200,66,0.45)",
          fontSize: "1rem",
          lineHeight: 2,
        }}
      >
        सर्वधर्मान्परित्यज्य
        <br />
        मामेकं शरणं व्रज
      </p>
      <p
        style={{
          color: "rgba(200,160,60,0.35)",
          fontSize: "0.75rem",
          marginTop: "1rem",
        }}
      >
        — 18.66
      </p>
    </div>
  );
}

function ChapterTitlePage({ chapter }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #f9f0dc 0%, #fdf5e4 100%)",
        padding: "2.5rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "14px",
          border: "1px solid rgba(160,120,50,0.2)",
          borderRadius: "3px",
        }}
      />

      <span
        style={{
          display: "inline-block",
          padding: "0.3rem 1rem",
          border: "1px solid rgba(160,120,50,0.35)",
          borderRadius: "99px",
          color: "#8B6914",
          fontSize: "0.7rem",
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.1em",
          marginBottom: "1.5rem",
        }}
      >
        CHAPTER {chapter.id}
      </span>

      <h2
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "1.35rem",
          color: "#3d2c0a",
          marginBottom: "0.6rem",
          lineHeight: 1.3,
        }}
      >
        {chapter.name}
      </h2>

      <div
        style={{
          width: "50px",
          height: "1px",
          background: "rgba(160,120,50,0.4)",
          margin: "1rem auto",
        }}
      />

      <p
        style={{
          fontFamily: "'Tiro Devanagari Sanskrit', serif",
          fontSize: "1.1rem",
          color: "#8B6914",
          marginBottom: "0.6rem",
          lineHeight: 1.9,
        }}
      >
        {chapter.sanskrit}
      </p>

      <p
        style={{
          color: "#6b5020",
          fontSize: "0.85rem",
          fontStyle: "italic",
          marginBottom: "1.5rem",
        }}
      >
        {chapter.meaning}
      </p>

      <div
        style={{
          background: "rgba(160,120,50,0.08)",
          border: "1px solid rgba(160,120,50,0.2)",
          borderRadius: "8px",
          padding: "0.6rem 1.2rem",
          color: "#8B6914",
          fontSize: "0.75rem",
          fontFamily: "'Cinzel', serif",
        }}
      >
        {chapter.verses} Verses
      </div>
    </div>
  );
}

function VersePage({ page }) {
  const { verse, chapterObj } = page;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #fdf8ee 0%, #faf2e0 100%)",
        padding: "1.6rem 1.8rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          paddingBottom: "0.6rem",
          borderBottom: "1px solid rgba(160,120,50,0.2)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "#8B6914",
            fontSize: "0.65rem",
            fontFamily: "'Cinzel', serif",
            letterSpacing: "0.08em",
          }}
        >
          {chapterObj.name}
        </span>
        <span
          style={{
            background: "rgba(139,105,20,0.1)",
            color: "#8B6914",
            fontSize: "0.65rem",
            padding: "0.15rem 0.6rem",
            borderRadius: "99px",
            fontFamily: "'Cinzel', serif",
          }}
        >
          {verse.chapter}.{verse.verse}
        </span>
      </div>

      {/* Sanskrit */}
      <div
        style={{
          padding: "0.9rem",
          background: "rgba(139,105,20,0.05)",
          borderRadius: "6px",
          border: "1px solid rgba(139,105,20,0.12)",
          marginBottom: "0.9rem",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            fontSize: "0.85rem",
            color: "#5a3e0a",
            lineHeight: 2,
            textAlign: "center",
          }}
        >
          {verse.sanskrit}
        </p>
      </div>

      {/* Transliteration */}
      <p
        style={{
          fontStyle: "italic",
          color: "#a07830",
          fontSize: "0.7rem",
          lineHeight: 1.7,
          marginBottom: "0.9rem",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {verse.transliteration}
      </p>

      <div
        style={{
          width: "30px",
          height: "1px",
          background: "rgba(160,120,50,0.3)",
          margin: "0 auto 0.9rem",
          flexShrink: 0,
        }}
      />

      {/* Translation */}
      <p
        style={{
          color: "#2d1f05",
          fontSize: "0.82rem",
          lineHeight: 1.9,
          fontFamily: "'Georgia', serif",
          flex: 1,
          overflow: "hidden",
        }}
      >
        "{verse.translation}"
      </p>

      {/* Commentary snippet */}
      {verse.commentary && (
        <div
          style={{
            marginTop: "0.9rem",
            flexShrink: 0,
            paddingTop: "0.7rem",
            borderTop: "1px solid rgba(160,120,50,0.15)",
          }}
        >
          <p
            style={{
              color: "#7a5c1e",
              fontSize: "0.68rem",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            💡 {verse.commentary.slice(0, 140)}
            {verse.commentary.length > 140 ? "..." : ""}
          </p>
        </div>
      )}

      {/* Topics */}
      <div
        style={{
          display: "flex",
          gap: "0.3rem",
          flexWrap: "wrap",
          marginTop: "0.7rem",
          flexShrink: 0,
        }}
      >
        {verse.topics.slice(0, 3).map((t) => (
          <span
            key={t}
            style={{
              fontSize: "0.6rem",
              padding: "0.15rem 0.5rem",
              border: "1px solid rgba(139,105,20,0.25)",
              borderRadius: "99px",
              color: "#8B6914",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Page texture lines (subtle) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg,transparent,rgba(139,105,20,0.08),transparent)",
        }}
      />
    </div>
  );
}

function PlaceholderPage({ page }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #fdf8ee 0%, #faf2e0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "#8B6914",
          fontFamily: "'Tiro Devanagari Sanskrit', serif",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        ॐ
      </p>
      <p style={{ color: "#a07830", fontSize: "0.8rem", fontStyle: "italic" }}>
        Chapter {page.chapter} — {page.chapterObj.name}
      </p>
      <p style={{ color: "#b09060", fontSize: "0.72rem", marginTop: "0.5rem" }}>
        Full verses coming soon
      </p>
    </div>
  );
}

function BlankPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #fdf8ee 0%, #faf2e0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "rgba(139,105,20,0.15)", fontSize: "2rem" }}>
        🕉️
      </span>
    </div>
  );
}

function renderPage(page) {
  if (!page) return <BlankPage />;
  switch (page.type) {
    case "cover":
      return <CoverPage />;
    case "back-cover":
      return <BackCoverPage />;
    case "chapter-title":
      return <ChapterTitlePage chapter={page.chapterObj} />;
    case "verse":
      return <VersePage page={page} />;
    case "placeholder":
      return <PlaceholderPage page={page} />;
    default:
      return <BlankPage />;
  }
}

// ── Main BookReader Component ──────────────────────────────────────────────

export default function BookReader() {
  const navigate = useNavigate();
  // currentSpread: which pair of pages is showing
  // spread 0 → pages 0,1 (cover + page 1)
  // spread N → pages N*2, N*2+1
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false); // which direction: "next" | "prev" | null
  const [flipProgress, setFlipProgress] = useState(0); // 0 to 1
  const [animating, setAnimating] = useState(false);
  const animRef = useRef(null);

  const totalSpreads = Math.ceil(TOTAL_PAGES / 2);

  const leftPageIdx = spread * 2;
  const rightPageIdx = spread * 2 + 1;

  const startFlip = useCallback(
    (direction) => {
      if (animating) return;
      if (direction === "next" && spread >= totalSpreads - 1) return;
      if (direction === "prev" && spread <= 0) return;

      setFlipping(direction);
      setFlipProgress(0);
      setAnimating(true);

      const start = performance.now();
      const duration = 600; // ms

      const animate = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        // Ease in-out cubic
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        setFlipProgress(eased);

        if (t < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          setFlipProgress(1);
          setSpread((s) => (direction === "next" ? s + 1 : s - 1));
          setFlipping(null);
          setFlipProgress(0);
          setAnimating(false);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    },
    [animating, spread, totalSpreads],
  );

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") startFlip("next");
      if (e.key === "ArrowLeft" || e.key === "PageUp") startFlip("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startFlip]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(100,60,10,0.25) 0%, var(--color-bg) 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "68px",
        padding: "80px 1rem 2rem",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/chapters")}
        style={{
          position: "fixed",
          top: "80px",
          left: "1.5rem",
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(245,200,66,0.2)",
          color: "var(--color-gold)",
          padding: "0.4rem 1rem",
          borderRadius: "99px",
          cursor: "pointer",
          fontSize: "0.85rem",
          zIndex: 10,
        }}
      >
        ← Chapters
      </button>

      {/* Chapter selector */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "1.5rem",
          zIndex: 10,
        }}
      >
        <select
          value={spread}
          onChange={(e) => {
            if (!animating) setSpread(Number(e.target.value));
          }}
          style={{
            background: "rgba(10,10,15,0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(245,200,66,0.2)",
            color: "var(--color-gold)",
            padding: "0.4rem 0.8rem",
            borderRadius: "99px",
            cursor: "pointer",
            fontSize: "0.8rem",
            outline: "none",
          }}
        >
          <option value={0}>Cover</option>
          {CHAPTERS.map((ch) => {
            // Find which spread the chapter title is on
            const pageIdx = ALL_PAGES.findIndex(
              (p) => p.type === "chapter-title" && p.chapter === ch.id,
            );
            if (pageIdx < 0) return null;
            const s = Math.floor(pageIdx / 2);
            return (
              <option key={ch.id} value={s}>
                Ch {ch.id}: {ch.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Page counter */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(245,200,66,0.15)",
          color: "var(--color-muted)",
          padding: "0.4rem 1.2rem",
          borderRadius: "99px",
          fontSize: "0.78rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span>
          {spread === 0
            ? "Cover"
            : `Pages ${leftPageIdx}–${Math.min(rightPageIdx, TOTAL_PAGES - 1)}`}
          <span style={{ color: "rgba(100,80,50,0.5)", marginLeft: "0.4rem" }}>
            / {TOTAL_PAGES}
          </span>
        </span>
        <span style={{ color: "rgba(245,200,66,0.3)" }}>|</span>
        <span style={{ fontSize: "0.7rem" }}>← → to flip</span>
      </div>

      {/* ── The 3D Book ───────────────────────────────────────────── */}
      <ThreeBook
        allPages={ALL_PAGES}
        spread={spread}
        flipping={flipping}
        flipProgress={flipProgress}
        renderPageFunc={renderPage}
      />

      {/* ── Navigation buttons ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2.5rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => startFlip("prev")}
          disabled={spread <= 0 || animating}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background:
              spread <= 0 || animating
                ? "rgba(30,20,5,0.4)"
                : "rgba(245,200,66,0.12)",
            border: "1px solid rgba(245,200,66,0.3)",
            color:
              spread <= 0 || animating
                ? "rgba(245,200,66,0.2)"
                : "var(--color-gold)",
            cursor: spread <= 0 || animating ? "not-allowed" : "pointer",
            fontSize: "1.3rem",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            if (spread > 0 && !animating)
              e.currentTarget.style.background = "rgba(245,200,66,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              spread <= 0 ? "rgba(30,20,5,0.4)" : "rgba(245,200,66,0.12)";
          }}
          aria-label="Previous page"
        >
          ←
        </button>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--color-muted)", fontSize: "0.78rem" }}>
            Click arrows or use keyboard ← →
          </p>
        </div>

        <button
          onClick={() => startFlip("next")}
          disabled={spread >= totalSpreads - 1 || animating}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background:
              spread >= totalSpreads - 1 || animating
                ? "rgba(30,20,5,0.4)"
                : "rgba(245,200,66,0.12)",
            border: "1px solid rgba(245,200,66,0.3)",
            color:
              spread >= totalSpreads - 1 || animating
                ? "rgba(245,200,66,0.2)"
                : "var(--color-gold)",
            cursor:
              spread >= totalSpreads - 1 || animating
                ? "not-allowed"
                : "pointer",
            fontSize: "1.3rem",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            if (spread < totalSpreads - 1 && !animating)
              e.currentTarget.style.background = "rgba(245,200,66,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              spread >= totalSpreads - 1
                ? "rgba(30,20,5,0.4)"
                : "rgba(245,200,66,0.12)";
          }}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      {/* Mobile hint */}
      <style>{`
        @media (max-width: 860px) {
          /* Scale book to fit screen */
        }
        @media (max-width: 600px) {
          .book-hint { display: none; }
        }
      `}</style>
    </div>
  );
}
