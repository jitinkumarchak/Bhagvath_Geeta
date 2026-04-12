import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-5 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DF] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            : "bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1100px] mx-auto flex items-center">
          {/* Logo */}
          <Link
            to="/"
            className="no-underline flex items-center gap-2 mr-auto"
          >
            <span className="text-2xl leading-none opacity-70">🕉</span>
            <span className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#B8860B] tracking-wide">
              Gita AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-1 items-center">
            {NAV_LINKS.map((link) => {
              const active = location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`no-underline px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    active
                      ? "text-[#B8860B] font-semibold bg-[#B8860B]/8"
                      : "text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F0EDE8]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden bg-transparent border-none cursor-pointer text-[#6B6560] text-xl p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-[99] bg-[#FAF8F5]/98 backdrop-blur-lg border-b border-[#E8E4DF] p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`no-underline py-3 px-4 rounded-xl text-base transition-all duration-200 ${
                  active
                    ? "text-[#B8860B] font-semibold bg-[#B8860B]/8 border-l-2 border-[#B8860B]"
                    : "text-[#6B6560] hover:text-[#2D2A26] hover:bg-[#F0EDE8] border-l-2 border-transparent"
                }`}
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
          className="fixed top-16 left-0 right-0 bottom-0 z-[98] border-none bg-black/10"
        />
      )}
    </>
  );
}
