/**
 * ThreeBook.jsx — Premium CSS 3D Page-Flip Book Viewer
 *
 * Props from BookReader:
 *   allPages       — full page array
 *   spread         — current spread index (pair of pages)
 *   flipping       — "next" | "prev" | null
 *   flipProgress   — 0-1 animation progress
 *   renderPageFunc — function(page) → JSX
 */

import React from "react";

/* ─── Constants ────────────────────────────────────────────────────────────── */
const BOOK_W = 800;   // total book width (both pages)
const BOOK_H = 560;   // book height
const PAGE_W = 380;   // single page width
const PAGE_H = 520;   // single page height

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

/** Clamp helper */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));



/* ─── Sub-components ───────────────────────────────────────────────────────── */

/** Thin book spine */
function Spine() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "28px",
        height: PAGE_H + 20,
        background:
          "linear-gradient(180deg, #3a2200 0%, #6b3a00 20%, #8b5500 50%, #6b3a00 80%, #3a2200 100%)",
        zIndex: 20,
        boxShadow: "2px 0 12px rgba(0,0,0,0.6), -2px 0 12px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
      }}
    >
      {/* Spine gold lines */}
      {[0.2, 0.5, 0.8].map((p) => (
        <div
          key={p}
          style={{
            width: "6px",
            height: "1px",
            background: "rgba(245,200,60,0.6)",
          }}
        />
      ))}
    </div>
  );
}

/** A static page surface */
function PageSurface({ children, side = "left", style = {} }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "right" : "left"]: "50%",
        transform: `translateY(-50%)`,
        width: PAGE_W,
        height: PAGE_H,
        background: "linear-gradient(180deg, #fdf8ee 0%, #faf2e0 100%)",
        borderRadius: isLeft ? "4px 0 0 4px" : "0 4px 4px 0",
        overflow: "hidden",
        boxShadow: isLeft
          ? "inset -6px 0 14px rgba(0,0,0,0.08)"
          : "inset 6px 0 14px rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      {/* Page-edge gradient for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isLeft
            ? "linear-gradient(to right, transparent 90%, rgba(0,0,0,0.05))"
            : "linear-gradient(to left, transparent 90%, rgba(0,0,0,0.05))",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Subtle horizontal ruling lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(139,105,20,0.03) 27px, rgba(139,105,20,0.03) 28px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Page content */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

/** Cover page (dark, leather) */
function CoverSurface({ side = "left", children }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "right" : "left"]: "50%",
        transform: "translateY(-50%)",
        width: PAGE_W,
        height: PAGE_H,
        background:
          "linear-gradient(160deg, #2a1800 0%, #1a0e02 40%, #0d0a00 80%, #1a0800 100%)",
        borderRadius: isLeft ? "4px 0 0 4px" : "0 4px 4px 0",
        overflow: "hidden",
        boxShadow: isLeft
          ? "-8px 0 32px rgba(0,0,0,0.7), inset -4px 0 12px rgba(0,0,0,0.5)"
          : "8px 0 32px rgba(0,0,0,0.7), inset 4px 0 12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Leather texture vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 30% 30%, rgba(80,50,0,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * The flipping page leaf — rendered as a CSS `rotateY` element.
 * Flips from the center spine.
 * front = page leaving, back = page arriving.
 */
function FlippingLeaf({
  progress,       // 0→1
  direction,      // "next" | "prev"
  frontContent,
  backContent,
}) {
  /**
   * "next": the RIGHT page lifts and folds LEFT.
   *   progress=0 → rotateY(0deg)  (right page flat)
   *   progress=1 → rotateY(-180deg) (fully folded left, back=new left page shows)
   *
   * "prev": the LEFT page lifts and folds RIGHT.
   *   progress=0 → rotateY(0deg)  (left page flat, but we anchor right)
   *   progress=1 → rotateY(180deg) (fully folded right, back=new right page shows)
   */
  const p = clamp(progress, 0, 1);

  const isNext = direction === "next";

  // Angle: 0 → flat, 1 → 180° folded
  const angle = isNext ? -(p * 180) : p * 180;

  // Shadow intensity peaks at mid-flip
  const shadow = Math.sin(p * Math.PI);

  // Leaf is anchored at the spine (center): positioned at half-book width from center
  const leafStyle = {
    position: "absolute",
    top: "50%",
    // Anchor leaf at spine edge
    ...(isNext
      ? { left: "50%", transformOrigin: "0% 50%" }   // right leaf → pivots at left edge
      : { right: "50%", transformOrigin: "100% 50%" } // left leaf  → pivots at right edge
    ),
    transform: `translateY(-50%) rotateY(${angle}deg)`,
    width: PAGE_W,
    height: PAGE_H,
    transformStyle: "preserve-3d",
    perspective: "none",
    zIndex: 30,
    willChange: "transform",
  };

  // Front face (the page being turned away)
  const frontStyle = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    background: "linear-gradient(180deg, #fdf8ee 0%, #faf2e0 100%)",
    borderRadius: isNext ? "0 4px 4px 0" : "4px 0 0 4px",
    boxShadow: isNext
      ? `inset ${-shadow * 20}px 0 ${shadow * 40}px rgba(0,0,0,${shadow * 0.25})`
      : `inset ${shadow * 20}px 0 ${shadow * 40}px rgba(0,0,0,${shadow * 0.25})`,
  };

  // Back face (the new page)
  const backStyle = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    overflow: "hidden",
    background: "linear-gradient(180deg, #fdf8ee 0%, #faf2e0 100%)",
    borderRadius: isNext ? "4px 0 0 4px" : "0 4px 4px 0",
    boxShadow: isNext
      ? `inset ${shadow * 20}px 0 ${shadow * 40}px rgba(0,0,0,${shadow * 0.2})`
      : `inset ${-shadow * 20}px 0 ${shadow * 40}px rgba(0,0,0,${shadow * 0.2})`,
  };

  // Global dark overlay that sweeps across as page flips
  const overlayOpacity = shadow * 0.18;

  return (
    <div style={leafStyle}>
      {/* Front face */}
      <div style={frontStyle}>
        <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
          {frontContent}
        </div>
        {/* Shadow sweep overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isNext
              ? `linear-gradient(to left, rgba(0,0,0,${overlayOpacity * 2}) 0%, rgba(0,0,0,0) 80%)`
              : `linear-gradient(to right, rgba(0,0,0,${overlayOpacity * 2}) 0%, rgba(0,0,0,0) 80%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>

      {/* Back face */}
      <div style={backStyle}>
        <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
          {backContent}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isNext
              ? `linear-gradient(to right, rgba(0,0,0,${overlayOpacity * 1.5}) 0%, rgba(0,0,0,0) 80%)`
              : `linear-gradient(to left, rgba(0,0,0,${overlayOpacity * 1.5}) 0%, rgba(0,0,0,0) 80%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Main ThreeBook Component ─────────────────────────────────────────────── */

export default function ThreeBook({
  allPages,
  spread,
  flipping,
  flipProgress,
  renderPageFunc,
}) {
  const totalSpreads = Math.ceil(allPages.length / 2);

  // Derive page indices for current spread
  const leftIdx  = spread * 2;
  const rightIdx = spread * 2 + 1;

  // Pages for the static (resting) spread
  const leftPage  = allPages[leftIdx]  || null;
  const rightPage = allPages[rightIdx] || null;

  // Pages for the spread BEFORE (used for "prev" flip back-face / next-flip front-face)
  const prevLeftIdx  = (spread - 1) * 2;
  const prevRightIdx = (spread - 1) * 2 + 1;
  const prevLeftPage  = allPages[prevLeftIdx]  || null;
  const prevRightPage = allPages[prevRightIdx] || null;

  // Pages for the spread AFTER (used for "next" flip back-face destination)
  const nextLeftIdx  = (spread + 1) * 2;
  const nextRightIdx = (spread + 1) * 2 + 1;
  const nextLeftPage  = allPages[nextLeftIdx]  || null;
  const nextRightPage = allPages[nextRightIdx] || null;

  /* Determine which surface type to use (cover vs parchment) */
  const isCoverPage = (page) => page && (page.type === "cover" || page.type === "back-cover");

  const SurfaceLeft = isCoverPage(leftPage) ? CoverSurface : PageSurface;
  const SurfaceRight = isCoverPage(rightPage) ? CoverSurface : PageSurface;

  /* ── Flipping leaf pages ────────────────────────────────────────────────── */
  // When flipping "next":
  //   front = current RIGHT page (it lifts up and rotates)
  //   back  = next LEFT page (revealed as back of the flipped leaf)
  // When flipping "prev":
  //   front = current LEFT page (it lifts up and rotates right)
  //   back  = prev RIGHT page (revealed as back of the flipped leaf)

  let leafFront = null;
  let leafBack  = null;

  if (flipping === "next") {
    leafFront = rightPage;  // right page folds away
    leafBack  = nextLeftPage; // next left page revealed
  } else if (flipping === "prev") {
    leafFront = leftPage;   // left page folds away
    leafBack  = prevRightPage; // prev right page revealed
  }

  /* ── Static underlay during flip ──────────────────────────────────────── */
  // While flipping "next", the current left page stays      + next right page peeks
  // While flipping "prev", prev left page peeks             + current right page stays

  let underlayLeft  = null;
  let underlayRight = null;

  if (flipping === "next") {
    underlayLeft  = leftPage;
    underlayRight = nextRightPage;
  } else if (flipping === "prev") {
    underlayLeft  = prevLeftPage;
    underlayRight = rightPage;
  }

  /* ── Book-level drop shadow & ambient ─────────────────────────────────── */
  const bookShadow =
    "0 40px 100px rgba(0,0,0,0.55), 0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)";

  return (
    <div
      style={{
        position: "relative",
        width: BOOK_W,
        height: BOOK_H,
        perspective: "2000px",
        transformStyle: "preserve-3d",
        /* Subtle tilt for premium 3D look */
        transform: "rotateX(3deg)",
        flexShrink: 0,
      }}
    >
      {/* Book body */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          boxShadow: bookShadow,
          borderRadius: "6px",
        }}
      >
        {/* ── Static pages (resting or underlay during flip) ── */}
        {!flipping ? (
          <>
            {/* LEFT resting page */}
            <SurfaceLeft side="left">
              {renderPageFunc(leftPage)}
            </SurfaceLeft>

            {/* RIGHT resting page */}
            <SurfaceRight side="right">
              {renderPageFunc(rightPage)}
            </SurfaceRight>
          </>
        ) : (
          <>
            {/* UNDERLAY LEFT */}
            {underlayLeft !== undefined && (
              isCoverPage(underlayLeft)
                ? <CoverSurface side="left">{renderPageFunc(underlayLeft)}</CoverSurface>
                : <PageSurface side="left">{renderPageFunc(underlayLeft)}</PageSurface>
            )}

            {/* UNDERLAY RIGHT */}
            {underlayRight !== undefined && (
              isCoverPage(underlayRight)
                ? <CoverSurface side="right">{renderPageFunc(underlayRight)}</CoverSurface>
                : <PageSurface side="right">{renderPageFunc(underlayRight)}</PageSurface>
            )}

            {/* THE FLIPPING LEAF */}
            <FlippingLeaf
              progress={flipProgress}
              direction={flipping}
              frontContent={renderPageFunc(leafFront)}
              backContent={renderPageFunc(leafBack)}
            />
          </>
        )}

        {/* ── Book spine ── */}
        <Spine />

        {/* ── Ambient top-light gloss ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
            pointerEvents: "none",
            zIndex: 40,
            borderRadius: "6px 6px 0 0",
          }}
        />

        {/* ── Page edge stack illusion (right side) ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "calc(50% - 396px)",
            transform: "translateY(-50%)",
            width: "16px",
            height: PAGE_H - 8,
            background:
              "repeating-linear-gradient(to right, #f0e8d0 0px, #e8ddc0 1px, #f0e8d0 2px)",
            boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
            borderRadius: "0 3px 3px 0",
            zIndex: 5,
          }}
        />

        {/* ── Page edge stack illusion (left side) ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "calc(50% - 396px)",
            transform: "translateY(-50%)",
            width: "16px",
            height: PAGE_H - 8,
            background:
              "repeating-linear-gradient(to left, #f0e8d0 0px, #e8ddc0 1px, #f0e8d0 2px)",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
            borderRadius: "3px 0 0 3px",
            zIndex: 5,
          }}
        />
      </div>

      {/* ── CSS for transitions ── */}
      <style>{`
        @keyframes pageBreath {
          0%, 100% { box-shadow: 0 40px 100px rgba(0,0,0,0.55), 0 12px 32px rgba(0,0,0,0.35); }
          50%       { box-shadow: 0 44px 110px rgba(0,0,0,0.60), 0 14px 36px rgba(0,0,0,0.40); }
        }

        @media (max-width: 860px) {
          /* Handled by parent scaling */
        }
      `}</style>
    </div>
  );
}
