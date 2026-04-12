import React from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS } from "../data/gita";

export default function Chapters() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 max-w-[1000px] mx-auto px-6 py-10">
      {/* Header */}
      <div
        className="text-center mb-10"
        style={{ animation: "fadeInUp 0.5s ease" }}
      >
        <h1 className="font-['Cormorant_Garamond',serif] text-4xl font-semibold text-[#2D2A26] mb-3">
          The Bhagavad Gita
        </h1>
        <p className="text-[#8A8580] max-w-[460px] mx-auto leading-relaxed">
          18 chapters · 700 verses · The eternal dialogue between Arjuna and Krishna
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-12 mb-10 flex-wrap">
        {[
          { label: "Chapters", value: "18" },
          { label: "Verses", value: "700" },
          { label: "Yogas", value: "18" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-bold font-['Cormorant_Garamond',serif] text-[#B8860B]">
              {s.value}
            </div>
            <div className="text-[#8A8580] text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 3D Book CTA */}
      <div className="text-center mb-8">
        <button
          className="bg-[#B8860B] text-white font-medium text-sm py-2.5 px-6 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] hover:shadow-[0_4px_20px_rgba(184,134,11,0.2)]"
          onClick={() => navigate("/book")}
        >
          📚 Read as 3D Book
        </button>
        <p className="text-[#8A8580] text-xs mt-2">
          Flip pages like a real book
        </p>
      </div>

      {/* Chapters grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            className="bg-white border border-[#E8E4DF] rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#D4C9BC] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5"
            style={{ animation: `fadeInUp 0.4s ease ${i * 0.03}s backwards` }}
            onClick={() => navigate(`/chapter/${ch.id}`)}
          >
            <div className="flex items-start gap-3">
              {/* Chapter number */}
              <div className="min-w-[40px] h-10 rounded-lg bg-[#B8860B]/8 border border-[#B8860B]/15 flex items-center justify-center font-['Cormorant_Garamond',serif] font-bold text-base text-[#B8860B] shrink-0">
                {ch.id}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-['Cormorant_Garamond',serif] text-sm font-semibold text-[#2D2A26] mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {ch.name}
                </h3>
                <p className="font-['Tiro_Devanagari_Sanskrit',serif] text-xs text-[#B8860B]/60 mb-1">
                  {ch.sanskrit}
                </p>
                <p className="text-[#8A8580] text-xs mb-2">
                  {ch.meaning}
                </p>
                <span className="text-[0.65rem] tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-2 py-0.5">
                  {ch.verses} verses
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
