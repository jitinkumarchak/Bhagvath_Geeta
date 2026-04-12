import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMOTIONS, getVersesByEmotion } from "../data/gita";
import VerseCard from "../components/VerseCard";

export default function LifeGuide() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const results = selected ? getVersesByEmotion(selected.key) : [];

  return (
    <div className="min-h-screen pt-16 max-w-[850px] mx-auto px-6 py-10">
      {/* Header */}
      <div
        className="text-center mb-10"
        style={{ animation: "fadeInUp 0.5s ease" }}
      >
        <h1 className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#2D2A26] mb-3">
          Life Guidance
        </h1>
        <p className="text-[#8A8580] max-w-[440px] mx-auto leading-relaxed">
          What are you going through right now? Choose your situation and
          receive Gita wisdom tailored for you.
        </p>
      </div>

      {/* Emotion grid */}
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 mb-10"
        style={{ animation: "fadeInUp 0.5s ease 0.1s backwards" }}
      >
        {EMOTIONS.map((em) => (
          <button
            key={em.key}
            onClick={() =>
              setSelected(selected?.key === em.key ? null : em)
            }
            className={`py-4 px-3 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col items-center gap-2 ${
              selected?.key === em.key
                ? "border-[#B8860B] bg-[#B8860B]/8 text-[#2D2A26] scale-[1.03]"
                : "border-[#E8E4DF] bg-white text-[#6B6560] hover:bg-[#F3F0EB] hover:border-[#D4C9BC]"
            }`}
          >
            <span className="text-2xl">{em.emoji}</span>
            <span
              className={`text-sm ${
                selected?.key === em.key ? "font-semibold" : ""
              }`}
            >
              {em.label}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {selected && (
        <div style={{ animation: "fadeInUp 0.4s ease" }}>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xl">{selected.emoji}</span>
            <div>
              <h2 className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-[#2D2A26] mb-0.5">
                For {selected.label}
              </h2>
              <p className="text-[#8A8580] text-sm">
                {results.length > 0
                  ? `${results.length} verse${results.length > 1 ? "s" : ""} from the Gita`
                  : "No verses matched — try the AI chat for personalized guidance"}
              </p>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="flex flex-col gap-3">
              {results.map((v) => (
                <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border border-dashed border-[#E8E4DF] rounded-2xl">
              <p className="text-[#8A8580] mb-5">
                No verses found for this situation — ask the AI for
                personalized Gita wisdom.
              </p>
              <button
                className="bg-[#B8860B] text-white font-medium py-2.5 px-6 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] text-sm"
                onClick={() => navigate("/chat")}
              >
                ✦ Ask the AI Teacher
              </button>
            </div>
          )}
        </div>
      )}

      {/* CTA when nothing selected */}
      {!selected && (
        <div className="text-center py-6 text-[#8A8580]">
          <p>Select a feeling above to receive guidance ↑</p>
          <p className="mt-3 text-sm">
            Or{" "}
            <span
              className="text-[#B8860B] cursor-pointer hover:underline"
              onClick={() => navigate("/chat")}
            >
              chat with the AI directly →
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
