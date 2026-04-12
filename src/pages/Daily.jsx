import React from "react";
import { useNavigate } from "react-router-dom";
import { getDailyVerse, VERSES } from "../data/gita";

export default function Daily() {
  const navigate = useNavigate();
  const daily = getDailyVerse();

  const dayIndex = VERSES.findIndex(
    (v) => v.chapter === daily.chapter && v.verse === daily.verse
  );
  const recent = [
    VERSES[(dayIndex - 1 + VERSES.length) % VERSES.length],
    VERSES[(dayIndex - 2 + VERSES.length) % VERSES.length],
  ].filter((v) => v.verse !== daily.verse);

  return (
    <div className="min-h-screen pt-16 max-w-[700px] mx-auto px-6 py-10">
      {/* Header */}
      <div
        className="text-center mb-10"
        style={{ animation: "fadeInUp 0.5s ease" }}
      >
        <h1 className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#2D2A26] mb-2">
          Daily Wisdom
        </h1>
        <p className="text-[#8A8580]">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Today's verse */}
      <div
        className="bg-white border border-[#E8E4DF] rounded-2xl p-8 mb-6 text-center"
        style={{ animation: "fadeInUp 0.5s ease 0.1s backwards" }}
      >
        <span className="inline-flex py-1 px-4 bg-[#B8860B] text-white rounded-full text-xs font-semibold mb-5">
          ✦ Today&apos;s Verse
        </span>

        <p className="font-['Tiro_Devanagari_Sanskrit',serif] text-base leading-[2.2] text-[#6B4E2F] mb-5">
          {daily.sanskrit}
        </p>

        {/* Divider */}
        <div className="h-px bg-[#E8E4DF] my-5" />

        <p className="text-lg leading-[1.9] text-[#2D2A26] mb-4">
          &quot;{daily.translation}&quot;
        </p>

        <p className="text-[#8A8580] text-sm mb-6">
          — Bhagavad Gita {daily.chapter}.{daily.verse}
        </p>

        {daily.commentary && (
          <div className="p-4 bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl text-left mb-5">
            <p className="text-[#8A8580] text-sm leading-[1.8]">
              💡 {daily.commentary}
            </p>
          </div>
        )}

        <div className="flex gap-2.5 justify-center flex-wrap">
          <button
            className="bg-[#B8860B] text-white font-medium py-2.5 px-6 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] text-sm"
            onClick={() => navigate(`/verse/${daily.chapter}/${daily.verse}`)}
          >
            ✦ Explore & Ask AI
          </button>
          <button
            className="bg-transparent text-[#8A8580] py-2.5 px-5 rounded-full border border-[#E8E4DF] cursor-pointer transition-all duration-300 hover:bg-[#F0EDE8] hover:text-[#2D2A26] text-sm"
            onClick={() => {
              const text = `"${daily.translation}" — Bhagavad Gita ${daily.chapter}.${daily.verse}`;
              navigator.clipboard?.writeText(text);
            }}
          >
            📋 Copy
          </button>
        </div>
      </div>

      {/* Reflection */}
      <div
        className="bg-white border border-[#E8E4DF] rounded-xl p-5 mb-6"
        style={{ animation: "fadeInUp 0.5s ease 0.2s backwards" }}
      >
        <h3 className="font-['Cormorant_Garamond',serif] text-base font-semibold text-[#2D2A26] mb-2">
          🧘 Today&apos;s Reflection
        </h3>
        <p className="text-[#8A8580] leading-[1.8] text-sm">
          Sit quietly for a moment. Read the verse again. Ask yourself:{" "}
          <em className="text-[#2D2A26]">
            &quot;Where in my life today can I apply this teaching?&quot;
          </em>
        </p>
      </div>

      {/* Recent verses */}
      {recent.length > 0 && (
        <div style={{ animation: "fadeInUp 0.5s ease 0.3s backwards" }}>
          <h2 className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#2D2A26] mb-4">
            Recent Verses
          </h2>
          {recent.map((v) => (
            <div
              key={`${v.chapter}-${v.verse}`}
              className="bg-white border border-[#E8E4DF] rounded-xl p-4 mb-2.5 cursor-pointer transition-all duration-300 hover:border-[#D4C9BC] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              onClick={() => navigate(`/verse/${v.chapter}/${v.verse}`)}
            >
              <span className="text-[0.65rem] tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-2 py-0.5 mb-2 inline-block">
                Ch {v.chapter} · V {v.verse}
              </span>
              <p className="text-[#2D2A26] text-sm leading-relaxed mt-1.5">
                &quot;{v.translation.slice(0, 120)}...&quot;
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
