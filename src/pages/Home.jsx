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
    surfaceGlass: dark ? "rgba(28, 26, 23, 0.6)" : "rgba(255, 255, 255, 0.6)",
    surface: dark ? "#1C1A17" : "#FFFFFF",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    borderHover: dark ? "rgba(196,154,60,0.3)" : "rgba(160,120,40,0.3)",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
    sanskrit: dark ? "#D4B878" : "#5C4020",
    gradientStart: dark ? "#C49A3C" : "#A07828",
    gradientEnd: dark ? "#E8D096" : "#eab308",
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", overflow: "hidden", position: "relative" }}>
      {/* ── Dynamic Background Orbs ──────────────────────── */}
      <div style={{
        position: "absolute",
        top: "-10%", left: "-5%",
        width: "60vw", height: "60vw",
        background: dark ? "radial-gradient(circle, rgba(196,154,60,0.06) 0%, transparent 60%)" : "radial-gradient(circle, rgba(160,120,40,0.06) 0%, transparent 60%)",
        filter: "blur(60px)",
        animation: "floatOrb1 20s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "-20%", right: "-10%",
        width: "70vw", height: "70vw",
        background: dark ? "radial-gradient(circle, rgba(150,150,150,0.03) 0%, transparent 60%)" : "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",
        filter: "blur(80px)",
        animation: "floatOrb2 25s ease-in-out infinite reverse",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Hero ────────────────────────────────────────── */}
        <section style={{
          minHeight: "88vh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "32px 24px",
          position: "relative",
        }}>
          {/* Om symbol */}
          <div style={{
            fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1, marginBottom: "24px",
            opacity: visible ? 0.8 : 0,
            transition: "opacity 1.5s ease",
            animation: visible ? "float 6s ease-in-out infinite" : "none",
            filter: dark ? "drop-shadow(0 0 20px rgba(196,154,60,0.3))" : "drop-shadow(0 0 20px rgba(160,120,40,0.2))",
            color: c.gold
          }}>
            🕉️
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            maxWidth: "720px",
            marginBottom: "24px",
            color: c.text,
            letterSpacing: "-0.01eM",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.22,0.61,0.36,1) 0.2s",
          }}>
            Ancient Wisdom.
            <br />
            <span style={{
              background: `linear-gradient(to right, ${c.gradientStart}, ${c.gradientEnd}, ${c.gradientStart})`,
              backgroundSize: "200% auto",
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: visible ? "textGradient 6s linear infinite" : "none",
              display: "inline-block",
              paddingTop: "8px"
            }}>
              Modern Clarity.
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: c.textSecondary,
            maxWidth: "500px",
            lineHeight: 1.8,
            marginBottom: "40px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.4s",
          }}>
            Explore the Bhagavad Gita with AI guidance — verse by verse,
            topic by topic, and tailored to your life.
          </p>

          <div style={{
            display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.6s",
          }}>
            <button
              style={{
                background: `linear-gradient(135deg, ${c.gradientStart}, ${c.gold})`,
                color: dark ? "#1A1A1A" : "#FFFFFF",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "14px 36px",
                borderRadius: "99px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
                boxShadow: dark ? "0 8px 30px rgba(196,154,60,0.25)" : "0 8px 30px rgba(160,120,40,0.25)",
              }}
              onClick={() => navigate("/chapters")}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; 
                e.currentTarget.style.boxShadow = dark ? "0 12px 40px rgba(196,154,60,0.35)" : "0 12px 40px rgba(160,120,40,0.35)";
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = "translateY(0) scale(1)"; 
                e.currentTarget.style.boxShadow = dark ? "0 8px 30px rgba(196,154,60,0.25)" : "0 8px 30px rgba(160,120,40,0.25)";
              }}
            >
              Start Reading
            </button>
            <button
              style={{
                background: c.surfaceGlass,
                backdropFilter: "blur(12px)",
                color: c.text,
                fontWeight: 600,
                fontSize: "1rem",
                padding: "14px 36px",
                borderRadius: "99px",
                border: `1px solid ${c.border}`,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
              onClick={() => navigate("/chat")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.goldSoft;
                e.currentTarget.style.borderColor = c.gold;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = c.surfaceGlass;
                e.currentTarget.style.borderColor = c.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Ask the Gita ✨
            </button>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: "absolute", bottom: "32px",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "8px", color: c.textMuted, fontSize: "0.8rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 1.5s",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            <span>Scroll to Discover</span>
            <span style={{ animation: "float 2s ease-in-out infinite", fontSize: "1.2rem" }}>↓</span>
          </div>
        </section>

        {/* ── Daily Wisdom ────────────────────────────────── */}
        <section style={{ maxWidth: "780px", margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ 
            display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px",
            opacity: visible ? 1 : 0, animation: visible ? "fadeInUp 0.8s ease 0.8s forwards" : "none"
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem", fontWeight: 600,
                color: c.text, marginBottom: "4px",
              }}>
                Daily Reflection
              </h2>
              <p style={{ color: c.textSecondary, fontSize: "0.95rem" }}>
                {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>
            <Link to="/daily" style={{
              marginLeft: "auto", textDecoration: "none",
              color: c.gold, fontSize: "0.9rem", fontWeight: 500,
              display: "flex", alignItems: "center", gap: "4px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
            >
              View Past Days <span style={{ fontSize: "1.2em" }}>→</span>
            </Link>
          </div>
          <div style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeInUp 0.8s ease 1s forwards" : "none",
            position: "relative"
          }}>
            <div style={{
              position: "absolute", inset: "-2px", borderRadius: "20px",
              background: `linear-gradient(135deg, ${c.goldSoft}, transparent)`,
              zIndex: -1, filter: "blur(8px)"
            }} />
            <VerseCard verse={daily} />
          </div>
        </section>

        {/* ── Features Grid ───────────────────────────────── */}
        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.2rem", fontWeight: 600,
              color: c.text, marginBottom: "12px",
            }}>
              Paths to Wisdom
            </h2>
            <p style={{ color: c.textSecondary, fontSize: "1.05rem" }}>
              Explore the timeless teachings through various lenses
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.to}
                className="feature-card"
                style={{
                  background: c.surfaceGlass,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${c.border}`,
                  borderRadius: "20px",
                  padding: "32px 28px",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  animation: visible ? `fadeInUp 0.6s cubic-bezier(0.22,0.61,0.36,1) ${1.2 + (i * 0.1)}s forwards` : "none",
                  opacity: 0,
                  position: "relative",
                  overflow: "hidden"
                }}
                onClick={() => navigate(f.to)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.borderHover;
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = dark
                    ? "0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(196,154,60,0.1) inset"
                    : "0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(160,120,40,0.05) inset";
                  const icon = e.currentTarget.querySelector(".icon-container");
                  if (icon) icon.style.transform = "scale(1.1) rotate(5deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  const icon = e.currentTarget.querySelector(".icon-container");
                  if (icon) icon.style.transform = "scale(1) rotate(0)";
                }}
              >
                {/* Soft highlight inside card */}
                <div style={{
                  position: "absolute", top: 0, right: 0, width: "100px", height: "100px",
                  background: `radial-gradient(circle at top right, ${c.goldSoft}, transparent 70%)`,
                }} />
                
                <div className="icon-container" style={{ 
                  fontSize: "2rem", marginBottom: "16px",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "56px", height: "56px", borderRadius: "14px",
                  background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  animation: "float 6s ease-in-out infinite", animationDelay: `${i * 0.4}s` 
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem", fontWeight: 600,
                  color: c.text, marginBottom: "10px",
                }}>
                  {f.title}
                </h3>
                <p style={{ color: c.textSecondary, fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
                  {f.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ 
                    color: c.gold, fontSize: "0.8rem", fontWeight: 700, 
                    letterSpacing: "0.1em", textTransform: "uppercase" 
                  }}>
                    Explore
                  </span>
                  <span style={{ color: c.gold, marginLeft: "4px", fontSize: "1.1rem" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <section style={{
          textAlign: "center", padding: "80px 24px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "80%", height: "1px",
            background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`
          }} />

          <div style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: "99px",
            background: c.goldSoft,
            marginBottom: "24px"
          }}>
            <p style={{
              fontFamily: "'Tiro Devanagari Sanskrit', serif",
              fontSize: "1.5rem", color: c.sanskrit,
              animation: "breathe 5s ease-in-out infinite",
              margin: 0
            }}>
              योगः कर्मसु कौशलम्
            </p>
          </div>
          <p style={{ 
            color: c.textSecondary, marginBottom: "32px", fontSize: "1.1rem",
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" 
          }}>
            &quot;Yoga is the art of action perfected.&quot; — Bhagavad Gita 2.50
          </p>
          <button
            style={{
              background: `linear-gradient(135deg, ${c.gradientStart}, ${c.gold})`,
              color: dark ? "#1A1A1A" : "#FFFFFF",
              fontWeight: 600, fontSize: "1rem",
              padding: "16px 40px",
              borderRadius: "99px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.22,0.61,0.36,1)",
              boxShadow: dark ? "0 8px 30px rgba(196,154,60,0.25)" : "0 8px 30px rgba(160,120,40,0.2)",
            }}
            onClick={() => navigate("/chapters")}
            onMouseEnter={(e) => { 
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; 
                e.currentTarget.style.boxShadow = dark ? "0 12px 40px rgba(196,154,60,0.4)" : "0 12px 40px rgba(160,120,40,0.35)";
            }}
            onMouseLeave={(e) => { 
                e.currentTarget.style.transform = "translateY(0) scale(1)"; 
                e.currentTarget.style.boxShadow = dark ? "0 8px 30px rgba(196,154,60,0.25)" : "0 8px 30px rgba(160,120,40,0.2)";
            }}
          >
            Begin Your Journey →
          </button>
        </section>
      </div>
    </div>
  );
}
