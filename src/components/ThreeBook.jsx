import React, { useState, useEffect, useRef } from 'react';

// Export constants to preserve compatibility with BookReader imports
export const CSS_WIDTH = 512;
export const CSS_HEIGHT = 700;

export default function ThreeBook({
  allPages = [],
  spread = 0,
  flipping = null,
  flipProgress = 0,
  renderPageFunc
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // The fixed native resolution of the open book (both pages)
  const BOOK_W = 1024;
  const BOOK_H = 700;

  // Responsively scale the book down natively to fit small browsers perfectly
  useEffect(() => {
    const handleResize = () => {
      // Fit within a comfortable padding margin of the window, explicitly accounting for the fixed headers
      const winW = window.innerWidth - 80;
      const winH = window.innerHeight - 160; // Leave space for headers/footers

      const scaleW = winW / BOOK_W;
      const scaleH = winH / BOOK_H;
      setScale(Math.min(scaleW, scaleH)); // Auto-scales to fill entire available screen gracefully
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const leftPageIdx = spread * 2;
  const rightPageIdx = spread * 2 + 1;
  const nextLeftIdx = (spread + 1) * 2;
  const nextRightIdx = (spread + 1) * 2 + 1;
  const prevLeftIdx = (spread - 1) * 2;
  const prevRightIdx = (spread - 1) * 2 + 1;

  let staticLeftIdx = flipping === 'prev' ? prevLeftIdx : leftPageIdx;
  let staticRightIdx = flipping === 'next' ? nextRightIdx : rightPageIdx;

  // Helper safely fetches pages
  const renderLeft = renderPageFunc(allPages[staticLeftIdx] || null, staticLeftIdx);
  const renderRight = renderPageFunc(allPages[staticRightIdx] || null, staticRightIdx);

  const isFlipping = !!flipping;
  let flipFrontPage = null;
  let flipBackPage = null;
  let flipStyle = {};
  let frontFaceStyle = {};
  let backFaceStyle = {};

  if (flipping === 'next') {
    flipFrontPage = renderPageFunc(allPages[rightPageIdx] || null, rightPageIdx);
    flipBackPage = renderPageFunc(allPages[nextLeftIdx] || null, nextLeftIdx);
    flipStyle = {
      position: 'absolute', right: 0, top: 0, width: '50%', height: '100%',
      transformOrigin: 'left center',
      transform: `rotateY(${-180 * flipProgress}deg)`,
      transformStyle: 'preserve-3d',
      zIndex: 20,
      boxShadow: flipProgress < 0.5 ? '-5px 0 20px rgba(0,0,0,0.3)' : '5px 0 20px rgba(0,0,0,0.3)'
    };
    frontFaceStyle = {
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
      backgroundColor: '#FBF5E6', overflow: 'hidden'
    };
    backFaceStyle = {
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
      backgroundColor: '#FBF5E6', overflow: 'hidden',
      transform: 'rotateY(180deg)'
    };
  } else if (flipping === 'prev') {
    flipFrontPage = renderPageFunc(allPages[leftPageIdx] || null, leftPageIdx);
    flipBackPage = renderPageFunc(allPages[prevRightIdx] || null, prevRightIdx);
    flipStyle = {
      position: 'absolute', left: 0, top: 0, width: '50%', height: '100%',
      transformOrigin: 'right center',
      transform: `rotateY(${180 * flipProgress}deg)`,
      transformStyle: 'preserve-3d',
      zIndex: 20,
      boxShadow: flipProgress < 0.5 ? '5px 0 20px rgba(0,0,0,0.3)' : '-5px 0 20px rgba(0,0,0,0.3)'
    };
    frontFaceStyle = {
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
      backgroundColor: '#FBF5E6', overflow: 'hidden'
    };
    backFaceStyle = {
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
      backgroundColor: '#FBF5E6', overflow: 'hidden',
      transform: 'rotateY(-180deg)'
    };
  }

  const bookStyle = {
    position: 'relative',
    width: `${BOOK_W}px`,
    height: `${BOOK_H}px`,
    display: 'flex',
    perspective: '2500px',
    boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
    borderRadius: '12px',
    backgroundColor: '#1E1008', // Dark structural binding
    border: '4px solid #1a0e05',
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
  };

  const pageStyle = {
    width: '50%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#FBF5E6',
    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const spineShadingLeft = {
    position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px',
    background: 'linear-gradient(to left, rgba(0,0,0,0.35), transparent)',
    pointerEvents: 'none', zIndex: 10
  };

  const spineShadingRight = {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px',
    background: 'linear-gradient(to right, rgba(0,0,0,0.35), transparent)',
    pointerEvents: 'none', zIndex: 10
  };

  const bookCrease = {
    position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
    zIndex: 30, pointerEvents: 'none'
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }}
    >
      <div style={{ width: 0, height: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={bookStyle}>
          {/* Book Binding Crease */}
          <div style={bookCrease} />

          {/* Static Left Page */}
          <div style={{ ...pageStyle, borderRadius: '8px 0 0 8px' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {renderLeft}
            </div>
            <div style={spineShadingLeft} />
          </div>

          {/* Static Right Page */}
          <div style={{ ...pageStyle, borderRadius: '0 8px 8px 0' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {renderRight}
            </div>
            <div style={spineShadingRight} />
          </div>

          {/* CSS 3D Flipping Animation Element */}
          {isFlipping && (
            <div style={flipStyle}>
              <div style={frontFaceStyle}>
                {flipFrontPage}
                <div style={flipping === 'next' ? spineShadingRight : spineShadingLeft} />
              </div>
              <div style={backFaceStyle}>
                {flipBackPage}
                <div style={flipping === 'next' ? spineShadingLeft : spineShadingRight} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}