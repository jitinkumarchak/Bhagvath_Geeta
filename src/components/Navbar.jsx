import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../App";

const NAV_LINKS = [
  { to: "/chapters", label: "Reader" },
  { to: "/book", label: "3D Book" },
  { to: "/daily", label: "Daily" },
  { to: "/explore", label: "Explore" },
  { to: "/search", label: "Search" },
  { to: "/guide", label: "Guide" },
  { to: "/chat", label: "AI Chat" },
];

export default function Navbar() {
  const location = useLocation();
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "all 0.3s ease",
          background: dark
            ? scrolled ? "rgba(18,18,16,0.95)" : "rgba(18,18,16,0.8)"
            : scrolled ? "rgba(240,235,227,0.95)" : "rgba(240,235,227,0.8)",
          borderBottom: scrolled
            ? `1px solid ${dark ? "rgba(62,56,48,0.8)" : "rgba(200,193,181,0.8)"}`
            : "1px solid transparent",
          boxShadow: scrolled
            ? dark ? "0 1px 12px rgba(0,0,0,0.3)" : "0 1px 8px rgba(0,0,0,0.04)"
            : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginRight: "auto",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "1.5rem", lineHeight: 1, opacity: 0.7 }}>🕉</span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                fontWeight: 700,
                color: dark ? "#C49A3C" : "#A07828",
                letterSpacing: "0.03em",
              }}
            >
              Gita AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            {NAV_LINKS.map((link) => {
              const active = location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: active ? 600 : 400,
                    color: active
                      ? dark ? "#C49A3C" : "#A07828"
                      : dark ? "#9A9080" : "#7A7068",
                    background: active
                      ? dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)"
                      : "transparent",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = dark
                        ? "rgba(196,154,60,0.06)"
                        : "rgba(160,120,40,0.05)";
                      e.currentTarget.style.color = dark ? "#E8E0D4" : "#2A2520";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = dark ? "#9A9080" : "#7A7068";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            style={{
              background: "none",
              border: `1px solid ${dark ? "rgba(196,154,60,0.2)" : "rgba(160,120,40,0.15)"}`,
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
              marginLeft: "8px",
              flexShrink: 0,
            }}
            aria-label="Toggle dark mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: dark ? "#E8E0D4" : "#7A7068",
              fontSize: "1.3rem",
              padding: "4px",
              marginLeft: "4px",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: dark ? "rgba(18,18,16,0.98)" : "rgba(240,235,227,0.98)",
            backdropFilter: "blur(16px)",
            borderBottom: `1px solid ${dark ? "#2E2B27" : "#DDD7CE"}`,
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            animation: "fadeInUp 0.25s ease",
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: "none",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: active ? 600 : 400,
                  color: active
                    ? dark ? "#C49A3C" : "#A07828"
                    : dark ? "#9A9080" : "#7A7068",
                  background: active
                    ? dark ? "rgba(196,154,60,0.08)" : "rgba(160,120,40,0.06)"
                    : "transparent",
                  borderLeft: active
                    ? `2px solid ${dark ? "#C49A3C" : "#A07828"}`
                    : "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu backdrop"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 98,
            border: "none",
            background: dark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.1)",
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
