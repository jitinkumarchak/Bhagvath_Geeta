import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDailyVerse } from "../data/gita";
import VerseCard from "../components/VerseCard";

const FEATURES = [
  { to: "/chapters", title: "Gita Reader",       desc: "Read all 18 chapters verse by verse" },
  { to: "/guide",    title: "Life Guidance",      desc: "Find verses for your current struggle" },
  { to: "/explore",  title: "Topic Explore",      desc: "Browse wisdom by theme" },
  { to: "/search",   title: "Verse Search",       desc: "Search by concept or keyword" },
  { to: "/chat",     title: "AI Spiritual Chat",  desc: "Talk to an AI Gita teacher" },
  { to: "/daily",    title: "Daily Wisdom",       desc: "Today's verse & reflection" },
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
    <div className="min-h-screen pt-16 overflow-hidden">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="min-h-[88vh] flex flex-col items-center justify-center text-center px-6 relative">
        {/* Om symbol */}
        <div
          className="text-5xl leading-none mb-6 opacity-50 transition-opacity duration-1000"
          style={{ opacity: visible ? 0.5 : 0 }}
        >
          🕉️
        </div>

        {/* Headline */}
        <h1
          className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.15] max-w-[700px] mb-5 text-[#2D2A26] transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "0.2s",
          }}
        >
          Ancient Wisdom.
          <br />
          <span className="text-[#B8860B]">Modern Clarity.</span>
        </h1>

        <p
          className="text-[clamp(0.95rem,2vw,1.1rem)] text-[#8A8580] max-w-[480px] leading-[1.9] mb-8 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.4s",
          }}
        >
          Explore the Bhagavad Gita with AI guidance — verse by verse,
          topic by topic, and tailored to your life.
        </p>

        <div
          className="flex gap-3 flex-wrap justify-center transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.6s",
          }}
        >
          <button
            className="bg-[#B8860B] text-white font-medium text-base py-3 px-8 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] hover:shadow-[0_4px_20px_rgba(184,134,11,0.2)]"
            onClick={() => navigate("/chapters")}
          >
            Start Reading
          </button>
          <button
            className="bg-transparent text-[#B8860B] font-medium text-base py-3 px-8 rounded-full border border-[#B8860B]/25 cursor-pointer transition-all duration-300 hover:bg-[#B8860B]/5 hover:border-[#B8860B]/40"
            onClick={() => navigate("/chat")}
          >
            Ask the Gita
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-1 text-[#B8ADA0] text-xs"
          style={{ animation: "fadeInUp 1s ease 1.5s backwards" }}
        >
          <span>scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* ── Daily Wisdom ────────────────────────────────── */}
      <section className="max-w-[750px] mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h2 className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-[#2D2A26] mb-1">
              Today&apos;s Wisdom
            </h2>
            <p className="text-[#8A8580] text-sm">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link
            to="/daily"
            className="ml-auto no-underline text-[#B8860B] text-sm hover:underline"
          >
            See all →
          </Link>
        </div>
        <VerseCard verse={daily} />
      </section>

      {/* ── Features Grid ───────────────────────────────── */}
      <section className="max-w-[1000px] mx-auto px-6 pb-20">
        <h2 className="text-center font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#2D2A26] mb-2">
          Explore the Platform
        </h2>
        <p className="text-center text-[#8A8580] mb-10">
          Six ways to connect with Gita wisdom
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.to}
              className="bg-white border border-[#E8E4DF] rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-[#D4C9BC] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5"
              style={{ animation: `fadeInUp 0.5s ease ${i * 0.08}s backwards` }}
              onClick={() => navigate(f.to)}
            >
              <h3 className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#2D2A26] mb-2">
                {f.title}
              </h3>
              <p className="text-[#8A8580] text-sm leading-relaxed mb-4">
                {f.desc}
              </p>
              <span className="text-[#B8860B] text-xs font-semibold tracking-[0.08em] uppercase">
                Explore →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section className="text-center py-16 px-6 border-t border-[#E8E4DF]">
        <p className="font-['Tiro_Devanagari_Sanskrit',serif] text-xl text-[#B8860B]/70 mb-3">
          योगः कर्मसु कौशलम्
        </p>
        <p className="text-[#8A8580] mb-6">
          &quot;Yoga is the art of action perfected.&quot; — Bhagavad Gita 2.50
        </p>
        <button
          className="bg-[#B8860B] text-white font-medium py-3 px-8 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] hover:shadow-[0_4px_20px_rgba(184,134,11,0.2)]"
          onClick={() => navigate("/chapters")}
        >
          Begin Your Journey →
        </button>
      </section>
    </div>
  );
}
