import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDailyVerse } from "../data/gita";
import VerseCard from "../components/VerseCard";

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
  const daily = getDailyVerse();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page" style={{ overflow: "hidden" }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "92vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "2rem",
        position: "relative",
      }}>
        {/* Advanced Ambient Glows */}
        <div className="anim-float" style={{
          position: "absolute", width: "80vw", height: "80vw", maxWidth: "800px", maxHeight: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,178,152,0.06) 0%, transparent 60%)",
          top: "-10%", left: "10%", filter: "blur(80px)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div className="anim-float" style={{
          position: "absolute", width: "60vw", height: "60vw", maxWidth: "600px", maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229,235,131,0.05) 0%, transparent 60%)",
          bottom: "10%", right: "5%", filter: "blur(60px)",
          animationDelay: "-3s",
          pointerEvents: "none", zIndex: 0
        }} />

        {/* Om symbol */}
        <div
          className="anim-glow"
          style={{
            fontSize: "5rem", lineHeight: 1, marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          🕉️
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "800px",
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s",
            textShadow: "0 0 40px rgba(229,235,131,0.15)",
            zIndex: 1
          }}
        >
          <span className="gradient-text">Ancient Wisdom.</span>
          <br />
          <span style={{ color: "var(--color-cream)" }}>Modern Clarity.</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          color: "var(--color-muted)",
          maxWidth: "520px",
          lineHeight: 1.8,
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.4s",
        }}>
          Explore the Bhagavad Gita with AI guidance — verse by verse,
          topic by topic, and tailored to your life.
        </p>

        <div style={{
          display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s",
          zIndex: 1
        }}>
          <button className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
            onClick={() => navigate("/chapters")}>
            📖 Start Reading
          </button>
          <button className="btn-ghost" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
            onClick={() => navigate("/chat")}>
            ✨ Ask the Gita
          </button>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2rem",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "0.4rem", color: "var(--color-muted)", fontSize: "0.8rem",
          animation: "fadeInUp 1s ease 1.5s backwards",
        }}>
          <span>scroll to explore</span>
          <span style={{ animation: "fadeInUp 0.8s ease infinite alternate" }}>↓</span>
        </div>
      </section>

      {/* ── Daily Wisdom ─────────────────────────────────────────── */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <span style={{ fontSize: "2rem" }}>☀️</span>
          <div>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>Today&apos;s Wisdom</h2>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link to="/daily" style={{
            marginLeft: "auto", textDecoration: "none",
            color: "var(--color-gold)", fontSize: "0.85rem",
          }}>
            See all →
          </Link>
        </div>
        <VerseCard verse={daily} />
      </section>

      {/* ── Features Grid ─────────────────────────────────────────── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.75rem" }}>
          Explore the Platform
        </h2>
        <p style={{ textAlign: "center", color: "var(--color-muted)", marginBottom: "3rem" }}>
          Six ways to connect with Gita wisdom
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.to}
              className="card"
              style={{
                padding: "2.2rem",
                cursor: "pointer",
                animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s backwards`,
              }}
              onClick={() => navigate(f.to)}
            >
              <div className="anim-float" style={{ fontSize: "2.5rem", marginBottom: "1.2rem", display: "inline-block", animationDelay: `${i * 0.2}s` }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "1.3rem",
                marginBottom: "0.6rem", color: "var(--color-cream)", textShadow: "0 2px 10px rgba(0,0,0,0.5)"
              }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>{f.desc}</p>
              <div style={{ 
                marginTop: "1.8rem", color: "var(--color-gold-dim)", fontSize: "0.9rem", 
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: "0.5rem"
              }}>
                Explore <span style={{ transition: "translate 0.2s" }} className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section style={{
        textAlign: "center", padding: "5rem 2rem",
        borderTop: "1px solid var(--color-border)",
        background: "linear-gradient(180deg, transparent 0%, rgba(229,235,131,0.03) 100%)",
      }}>
        <p style={{
          fontFamily: "var(--font-sanskrit)", fontSize: "1.5rem",
          color: "var(--color-gold)", marginBottom: "1rem",
        }}>
          योगः कर्मसु कौशलम्
        </p>
        <p style={{ color: "var(--color-muted)", marginBottom: "2rem" }}>
          &quot;Yoga is the art of action perfected.&quot; — Bhagavad Gita 2.50
        </p>
        <button className="btn-primary" onClick={() => navigate("/chapters")}>
          Begin Your Journey →
        </button>
      </section>
    </div>
  );
}
