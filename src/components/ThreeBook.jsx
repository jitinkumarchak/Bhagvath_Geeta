/**
 * ThreeBook.jsx — Premium CSS 3D Page-Flip Book Viewer
 *
 * Props from BookReader:
 *   allPages       — full page array
 *   spread         — current spread index (pair of pages)
 *   flipping       — "next" | "prev" | null
 *   flipProgress   — 0-1 animation progress (eased)
 *   renderPageFunc — function(page) → JSX
 */

import React from "react";

/* ─── Constants ────────────────────────────────────────────────────────────── */
const BOOK_W = 840;  // total book width  (both pages + spine)
const BOOK_H = 560;  // book height
const PAGE_W = 390;  // single page width
const PAGE_H = 520;  // single page height
const SPINE_W = 32;  // spine width

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ─── Page parchment texture background ───────────────────────────────────── */
const PARCHMENT = "linear-gradient(160deg, #fdf9f0 0%, #f9f2df 50%, #f5ead0 100%)";
const PARCHMENT_DARK = "linear-gradient(160deg, #f5ead0 0%, #efdfc0 100%)";

/* ─── Sub-components ───────────────────────────────────────────────────────── */

/** Book spine */
function Spine() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: SPINE_W,
        height: PAGE_H + 16,
        background:
          "linear-gradient(180deg, #2c1800 0%, #5a3000 15%, #7a4800 30%, #9a6020 50%, #7a4800 70%, #5a3000 85%, #2c1800 100%)",
        zIndex: 25,
        boxShadow:
          "3px 0 16px rgba(0,0,0,0.65), -3px 0 16px rgba(0,0,0,0.65), inset 0 0 10px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: i === 2 ? "12px" : "8px",
            height: "1px",
            background:
              i === 2
                ? "rgba(245,200,60,0.8)"
                : "rgba(245,200,60,0.35)",
          }}
        />
      ))}
    </div>
  );
}

/** A static page surface — properly placed relative to spine */
function PageSurface({ children, side = "left", style = {} }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        ...(isLeft
          ? { right: "50%", marginRight: SPINE_W / 2 }
          : { left: "50%", marginLeft: SPINE_W / 2 }),
        transform: "translateY(-50%)",
        width: PAGE_W,
        height: PAGE_H,
        background: PARCHMENT,
        borderRadius: isLeft ? "6px 0 0 6px" : "0 6px 6px 0",
        overflow: "hidden",
        boxShadow: isLeft
          ? "inset -8px 0 20px rgba(0,0,0,0.07), -2px 0 8px rgba(0,0,0,0.1)"
          : "inset 8px 0 20px rgba(0,0,0,0.07), 2px 0 8px rgba(0,0,0,0.1)",
        ...style,
      }}
    >
      {/* Subtle ruled lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 29px, rgba(139,105,20,0.04) 29px, rgba(139,105,20,0.04) 30px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Inner shadow (spine side) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isLeft
            ? "linear-gradient(to right, transparent 80%, rgba(0,0,0,0.06) 100%)"
            : "linear-gradient(to left, transparent 80%, rgba(0,0,0,0.06) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

/** Cover page (dark leather) */
function CoverSurface({ side = "left", children }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        ...(isLeft
          ? { right: "50%", marginRight: SPINE_W / 2 }
          : { left: "50%", marginLeft: SPINE_W / 2 }),
        transform: "translateY(-50%)",
        width: PAGE_W,
        height: PAGE_H,
        background:
          "linear-gradient(160deg, #2a1800 0%, #1a0e02 40%, #0d0800 80%, #1a0800 100%)",
        borderRadius: isLeft ? "6px 0 0 6px" : "0 6px 6px 0",
        overflow: "hidden",
        boxShadow: isLeft
          ? "-10px 0 40px rgba(0,0,0,0.7), inset -4px 0 14px rgba(0,0,0,0.5)"
          : "10px 0 40px rgba(0,0,0,0.7), inset 4px 0 14px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 30% 25%, rgba(90,55,0,0.18) 0%, transparent 55%)",
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
 * The flipping page leaf.
 * Uses CSS rotateY around the spine edge.
 * Front = page turning away, Back = new page revealed.
 */
function FlippingLeaf({ progress, direction, frontContent, backContent }) {
  const p = clamp(progress, 0, 1);
  const isNext = direction === "next";

  // Angle: 0 = flat/open, 180 = fully folded to opposite side
  // For "next": right page flips LEFT  → 0 → -180
  // For "prev": left page flips RIGHT  → 0 → +180
  const angle = isNext ? -(p * 180) : p * 180;

  // Shadow intensity peaks at mid-flip (sin curve)
  const shadow = Math.sin(p * Math.PI);

  // During the first half, the FRONT face is showing (0→90°)
  // At exactly 90° is the edge view — both faces invisible
  // During second half, the BACK face shows (90°→180°)

  // Curvature illusion:  slight non-linear shadow on the face that is turning
  const frontShadowStrength = shadow * (p < 0.5 ? 0.35 : 0.1);
  const backShadowStrength  = shadow * (p > 0.5 ? 0.35 : 0.1);

  const leafStyle = {
    position: "absolute",
    top: "50%",
    // Pivot at the spine edge
    ...(isNext
      ? { left: "50%", marginLeft: SPINE_W / 2, transformOrigin: "0% 50%" }
      : { right: "50%", marginRight: SPINE_W / 2, transformOrigin: "100% 50%" }),
    transform: `translateY(-50%) rotateY(${angle}deg)`,
    width: PAGE_W,
    height: PAGE_H,
    transformStyle: "preserve-3d",
    zIndex: 30,
    willChange: "transform",
  };

  // Front face styles
  const frontStyle = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    background: PARCHMENT,
    borderRadius: isNext ? "0 6px 6px 0" : "6px 0 0 6px",
    overflow: "hidden",
  };

  // Back face styles — rotated 180° so it faces the other way
  const backStyle = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    background: PARCHMENT_DARK,
    borderRadius: isNext ? "6px 0 0 6px" : "0 6px 6px 0",
    overflow: "hidden",
  };

  return (
    <div style={leafStyle}>
      {/* ── Front face ── */}
      <div style={frontStyle}>
        <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
          {frontContent}
        </div>
        {/* Shadow sweep: darkens from spine-side as page curls */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isNext
              ? `linear-gradient(to left, rgba(0,0,0,${frontShadowStrength * 2.5}) 0%, rgba(0,0,0,0) 70%)`
              : `linear-gradient(to right, rgba(0,0,0,${frontShadowStrength * 2.5}) 0%, rgba(0,0,0,0) 70%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Highlight band traveling across the page */}
        {p > 0.05 && p < 0.45 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isNext
                ? `linear-gradient(to right, transparent ${(p * 200) - 10}%, rgba(255,255,255,0.12) ${p * 200}%, transparent ${(p * 200) + 10}%)`
                : `linear-gradient(to left, transparent ${(p * 200) - 10}%, rgba(255,255,255,0.12) ${p * 200}%, transparent ${(p * 200) + 10}%)`,
              pointerEvents: "none",
              zIndex: 3,
            }}
          />
        )}
      </div>

      {/* ── Back face ── */}
      <div style={backStyle}>
        <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
          {backContent}
        </div>
        {/* Shadow sweep on the back face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isNext
              ? `linear-gradient(to right, rgba(0,0,0,${backShadowStrength * 2.5}) 0%, rgba(0,0,0,0) 70%)`
              : `linear-gradient(to left, rgba(0,0,0,${backShadowStrength * 2.5}) 0%, rgba(0,0,0,0) 70%)`,
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
  /* Derive page indices */
  const leftIdx  = spread * 2;
  const rightIdx = spread * 2 + 1;
  const leftPage  = allPages[leftIdx]  || null;
  const rightPage = allPages[rightIdx] || null;

  /* Neighboring spread pages */
  const prevLeftPage  = allPages[(spread - 1) * 2]      || null;
  const prevRightPage = allPages[(spread - 1) * 2 + 1]  || null;
  const nextLeftPage  = allPages[(spread + 1) * 2]      || null;
  const nextRightPage = allPages[(spread + 1) * 2 + 1]  || null;

  const isCover = (page) => page && (page.type === "cover" || page.type === "back-cover");

  /* ── Resolve what's shown during a flip ── */
  let leafFront     = null;
  let leafBack      = null;
  let underlayLeft  = leftPage;
  let underlayRight = rightPage;

  if (flipping === "next") {
    leafFront     = rightPage;      // right page lifts and folds left
    leafBack      = nextLeftPage;   // next left page is revealed on back
    underlayLeft  = leftPage;       // left stays put
    underlayRight = nextRightPage;  // right side shows the next-next page underneath
  } else if (flipping === "prev") {
    leafFront     = leftPage;       // left page lifts and folds right
    leafBack      = prevRightPage;  // prev right page is revealed on back
    underlayLeft  = prevLeftPage;   // prev left page shows underneath
    underlayRight = rightPage;      // right stays put
  }

  const renderSurface = (page, side) => {
    const El = isCover(page) ? CoverSurface : PageSurface;
    return <El side={side}>{renderPageFunc(page)}</El>;
  };

  /* ── Dynamic book shadow grows during flip ── */
  const flipShadow = flipping
    ? Math.sin(flipProgress * Math.PI) * 0.4
    : 0;

  const bookShadow = `
    0 ${50 + flipShadow * 20}px ${120 + flipShadow * 40}px rgba(0,0,0,${0.50 + flipShadow * 0.15}),
    0 ${16 + flipShadow * 6}px ${40 + flipShadow * 12}px rgba(0,0,0,0.30),
    0 2px 8px rgba(0,0,0,0.25)
  `;

  return (
    <>
      {/* Inject styles once */}
      <style>{`
        .threebook-root {
          position: relative;
          width: ${BOOK_W}px;
          height: ${BOOK_H}px;
          /* Perspective must be on the parent, NOT the rotating element */
          perspective: 2200px;
          perspective-origin: 50% 55%;
          flex-shrink: 0;
        }
        .threebook-body {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          /* Very subtle tilt — enough for depth without clipping */
          transform: rotateX(2deg);
          border-radius: 8px;
        }
        /* Page-edge stack on right */
        .threebook-edge-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: ${(BOOK_W - PAGE_W * 2 - SPINE_W) / 2 - 14}px;
          width: 14px;
          height: ${PAGE_H - 4}px;
          background: repeating-linear-gradient(
            to right,
            #ede3c8 0px,
            #f5edda 1px,
            #ede3c8 2px,
            #e8dcc5 3px
          );
          border-radius: 0 3px 3px 0;
          box-shadow: 3px 0 12px rgba(0,0,0,0.28), inset -1px 0 3px rgba(0,0,0,0.1);
          z-index: 4;
        }
        /* Page-edge stack on left */
        .threebook-edge-left {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: ${(BOOK_W - PAGE_W * 2 - SPINE_W) / 2 - 14}px;
          width: 14px;
          height: ${PAGE_H - 4}px;
          background: repeating-linear-gradient(
            to left,
            #ede3c8 0px,
            #f5edda 1px,
            #ede3c8 2px,
            #e8dcc5 3px
          );
          border-radius: 3px 0 0 3px;
          box-shadow: -3px 0 12px rgba(0,0,0,0.28), inset 1px 0 3px rgba(0,0,0,0.1);
          z-index: 4;
        }
        /* Top-light gloss over the whole book */
        .threebook-gloss {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.02) 30%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 50;
          border-radius: 8px;
        }
        /* Floor shadow cast below the book */
        .threebook-floor-shadow {
          position: absolute;
          bottom: -28px;
          left: 6%;
          right: 6%;
          height: 28px;
          background: radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.35) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      <div className="threebook-root">
        {/* Floor shadow */}
        <div className="threebook-floor-shadow" />

        <div
          className="threebook-body"
          style={{ boxShadow: bookShadow }}
        >
          {/* ── Static pages (resting state or underlay during flip) ── */}
          {!flipping ? (
            <>
              {renderSurface(leftPage, "left")}
              {renderSurface(rightPage, "right")}
            </>
          ) : (
            <>
              {/* Underlay pages visible behind the flipping leaf */}
              {renderSurface(underlayLeft, "left")}
              {renderSurface(underlayRight, "right")}

              {/* The flipping leaf */}
              <FlippingLeaf
                progress={flipProgress}
                direction={flipping}
                frontContent={renderPageFunc(leafFront)}
                backContent={renderPageFunc(leafBack)}
              />
            </>
          )}

          {/* Book spine */}
          <Spine />

          {/* Page-edge stack illusions */}
          <div className="threebook-edge-right" />
          <div className="threebook-edge-left" />

          {/* Top gloss */}
          <div className="threebook-gloss" />
        </div>
      </div>
    </>
  );
}
