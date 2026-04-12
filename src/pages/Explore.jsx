import React, { useState } from "react";
import { ALL_TOPICS, getVersesByTopic } from "../data/gita";
import VerseCard from "../components/VerseCard";

export default function Explore() {
  const [active, setActive] = useState(null);
  const results = active ? getVersesByTopic(active) : [];

  return (
    <div className="min-h-screen pt-16 max-w-[850px] mx-auto px-6 py-10">
      {/* Header */}
      <div
        className="text-center mb-10"
        style={{ animation: "fadeInUp 0.5s ease" }}
      >
        <h1 className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#2D2A26] mb-3">
          Explore by Topic
        </h1>
        <p className="text-[#8A8580] max-w-[420px] mx-auto leading-relaxed">
          Dive deep into the Gita&apos;s teachings by choosing a theme that speaks to you.
        </p>
      </div>

      {/* Topic cloud */}
      <div
        className="flex flex-wrap gap-2 justify-center mb-10"
        style={{ animation: "fadeInUp 0.5s ease 0.1s backwards" }}
      >
        {ALL_TOPICS.map((topic) => (
          <button
            key={topic}
            className={`text-sm px-4 py-2 rounded-full border cursor-pointer transition-all duration-200 ${
              active === topic
                ? "bg-[#B8860B] text-white border-[#B8860B] font-semibold"
                : "bg-white text-[#6B6560] border-[#E8E4DF] hover:bg-[#F3F0EB] hover:border-[#D4C9BC] hover:text-[#2D2A26]"
            }`}
            onClick={() => setActive(active === topic ? null : topic)}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </button>
        ))}
      </div>

      {/* Results */}
      {active && (
        <div style={{ animation: "fadeInUp 0.4s ease" }}>
          <h2 className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-[#2D2A26] mb-1 capitalize">
            {active}
          </h2>
          <p className="text-[#8A8580] text-sm mb-5">
            {results.length} {results.length === 1 ? "verse" : "verses"} on this topic
          </p>
          <div className="flex flex-col gap-3">
            {results.map((v) => (
              <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />
            ))}
          </div>
        </div>
      )}

      {!active && (
        <p className="text-center text-[#8A8580]">
          Select a topic above to see related verses ↑
        </p>
      )}
    </div>
  );
}
