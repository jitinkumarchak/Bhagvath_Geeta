import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/chapters", label: "Reader", icon: "📖" },
  { to: "/book", label: "3D Book", icon: "📚" },
  { to: "/daily", label: "Daily", icon: "☀️" },
  { to: "/explore", label: "Explore", icon: "🌿" },
  { to: "/search", label: "Search", icon: "🔍" },
  { to: "/guide", label: "Guide", icon: "🧭" },
  { to: "/chat", label: "AI Chat", icon: "✨" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "68px",
          background: scrolled ? "rgba(10,10,15,0.9)" : "rgba(10,10,15,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(245,200,66,0.15)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          padding: "0 1.25rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginRight: "auto",
            }}
          >
            <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>🕉</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontWeight: 700,
                background: "var(--grad-gold)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Gita AI
            </span>
          </Link>

          {/* Desktop links */}
          <div
            style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}
            className="desktop-nav"
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
                    padding: "0.4rem 0.9rem",
                    borderRadius: "99px",
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#000" : "var(--color-text)",
                    background: active ? "var(--grad-gold)" : "transparent",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.background =
                        "rgba(245,200,66,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "0.8rem" }}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text)",
              fontSize: "1.4rem",
              padding: "0.3rem",
            }}
            className="mobile-menu-btn"
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
            top: "68px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(10,10,15,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--color-border)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
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
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "1rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-gold)" : "var(--color-text)",
                  background: active ? "rgba(245,200,66,0.08)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  borderLeft: active
                    ? "2px solid var(--color-gold)"
                    : "2px solid transparent",
                }}
              >
                <span>{link.icon}</span>
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
            top: "68px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 98,
            border: "none",
            background: "rgba(0,0,0,0.45)",
          }}
        />
      )}

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
