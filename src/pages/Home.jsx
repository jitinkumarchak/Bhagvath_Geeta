import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDailyVerse } from "../data/gita";
import VerseCard from "../components/VerseCard";
import { useTheme } from "../App";

const FEATURES = [
  { to: "/chapters", icon: "📖", title: "Gita Reader",       desc: "Read all 18 chapters verse by verse" },
  { to: "/guide",    icon: "🧭", title: "Life Guidance",      desc: "Find verses for your current struggle" },
  { to: "/explore",  icon: "🌿", title: "Topic Explore",      desc: "Browse wisdom by theme" },
  { to: "/search",   icon: "🔍", title: "Verse Search",       desc: "Search by concept or keyword" },
  { to: "/chat",     icon: "✨", title: "AI Spiritual Chat",  desc: "Talk to an AI Gita teacher" },
  { to: "/daily",    icon: "☀️", title: "Daily Wisdom",       desc: "Today's verse & reflection" },
];

export default function Home() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const daily = getDailyVerse();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const c = {
    bg: dark ? "#121210" : "#F0EBE3",
    surface: dark ? "#1C1A17" : "#FFFFFF",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
    sanskrit: dark ? "#D4B878" : "#5C4020",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", overflow: "hidden" }}>
      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{
        minHeight: "88vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "32px 24px",
        position: "relative",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(196,154,60,0.04) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(160,120,40,0.04) 0%, transparent 70%)",
          top: "10%", left: "50%", transform: "translateX(-50%)",
          pointerEvents: "none",
          animation: "breathe 8s ease-in-out infinite",
        }} />

        {/* Om symbol */}
        <div style={{
          fontSize: "4rem", lineHeight: 1, marginBottom: "24px",
          opacity: visible ? 0.5 : 0,
          transition: "opacity 1.2s ease",
          animation: visible ? "float 6s ease-in-out infinite" : "none",
          filter: dark ? "drop-shadow(0 0 12px rgba(196,154,60,0.2))" : "none",
        }}>
          🕉️
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
          fontWeight: 300,
          lineHeight: 1.15,
          maxWidth: "680px",
          marginBottom: "20px",
          color: c.text,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.22,0.61,0.36,1) 0.2s",
        }}>
          Ancient Wisdom.
          <br />
          <span style={{
            color: c.gold,
            animation: visible ? "glowSoft 4s ease-in-out infinite" : "none",
          }}>
            Modern Clarity.
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          color: c.textSecondary,
          maxWidth: "460px",
          lineHeight: 1.9,
          marginBottom: "32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.4s",
        }}>
          Explore the Bhagavad Gita with AI guidance — verse by verse,
          topic by topic, and tailored to your life.
        </p>

        <div style={{
          display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.6s",
        }}>
          <button
            style={{
              background: c.gold,
              color: "#FFFFFF",
              fontWeight: 500,
              fontSize: "0.95rem",
              padding: "12px 32px",
              borderRadius: "99px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: dark ? "0 4px 20px rgba(196,154,60,0.2)" : "0 4px 20px rgba(160,120,40,0.15)",
            }}
            onClick={() => navigate("/chapters")}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
          >
            Start Reading
          </button>
          <button
            style={{
              background: "transparent",
              color: c.gold,
              fontWeight: 500,
              fontSize: "0.95rem",
              padding: "12px 32px",
              borderRadius: "99px",
              border: `1px solid ${dark ? "rgba(196,154,60,0.25)" : "rgba(160,120,40,0.2)"}`,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/chat")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.goldSoft;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Ask the Gita
          </button>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "32px",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "6px", color: c.textMuted, fontSize: "0.75rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}>
          <span>scroll to explore</span>
          <span style={{ animation: "float 2s ease-in-out infinite" }}>↓</span>
        </div>
      </section>

      {/* ── Daily Wisdom ────────────────────────────────── */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem", fontWeight: 600,
              color: c.text, marginBottom: "4px",
            }}>
              Today&apos;s Wisdom
            </h2>
            <p style={{ color: c.textSecondary, fontSize: "0.85rem" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link to="/daily" style={{
            marginLeft: "auto", textDecoration: "none",
            color: c.gold, fontSize: "0.85rem",
          }}>
            See all →
          </Link>
        </div>
        <VerseCard verse={daily} />
      </section>

      {/* ── Features Grid ───────────────────────────────── */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "16px 24px 80px" }}>
        <h2 style={{
          textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.8rem", fontWeight: 600,
          color: c.text, marginBottom: "8px",
        }}>
          Explore the Platform
        </h2>
        <p style={{ textAlign: "center", color: c.textSecondary, marginBottom: "40px" }}>
          Six ways to connect with Gita wisdom
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.to}
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: "14px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
                animation: `fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) ${i * 0.08}s forwards`,
                opacity: 0,
              }}
              onClick={() => navigate(f.to)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = c.borderHover;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = dark
                  ? "0 8px 24px rgba(0,0,0,0.3)"
                  : "0 8px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = c.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "12px", animation: "float 5s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem", fontWeight: 600,
                color: c.text, marginBottom: "6px",
              }}>
                {f.title}
              </h3>
              <p style={{ color: c.textSecondary, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "16px" }}>
                {f.desc}
              </p>
              <span style={{ color: c.gold, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Explore →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section style={{
        textAlign: "center", padding: "60px 24px",
        borderTop: `1px solid ${c.border}`,
      }}>
        <p style={{
          fontFamily: "'Tiro Devanagari Sanskrit', serif",
          fontSize: "1.3rem", color: c.sanskrit,
          marginBottom: "12px",
          animation: "breathe 5s ease-in-out infinite",
        }}>
          योगः कर्मसु कौशलम्
        </p>
        <p style={{ color: c.textSecondary, marginBottom: "24px" }}>
          &quot;Yoga is the art of action perfected.&quot; — Bhagavad Gita 2.50
        </p>
        <button
          style={{
            background: c.gold,
            color: "#FFFFFF",
            fontWeight: 500,
            padding: "12px 32px",
            borderRadius: "99px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate("/chapters")}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Begin Your Journey →
        </button>
      </section>
    </div>
  );
}
