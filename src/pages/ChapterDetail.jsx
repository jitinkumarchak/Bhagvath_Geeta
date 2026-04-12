import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapter, getVersesByChapter } from "../data/gita";

export default function ChapterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chapter = getChapter(id);
  const verses = getVersesByChapter(id);

  const totalVerses = chapter?.verses || 0;
  const verseNums = Array.from({ length: totalVerses }, (_, i) => i + 1);

  if (!chapter)
    return (
      <div className="min-h-screen pt-16 text-center py-16">
        <p className="text-[#8A8580]">Chapter not found</p>
      </div>
    );

  return (
    <div className="min-h-screen pt-16 max-w-[850px] mx-auto px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate("/chapters")}
        className="bg-transparent border-none cursor-pointer text-[#B8860B] mb-6 flex items-center gap-1 text-sm hover:underline"
      >
        ← All Chapters
      </button>

      {/* Chapter header */}
      <div className="mb-8" style={{ animation: "fadeInUp 0.5s ease" }}>
        <span className="text-xs tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-3 py-1">
          Chapter {chapter.id}
        </span>
        <h1 className="font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#2D2A26] mt-3 mb-1">
          {chapter.name}
        </h1>
        <p className="font-['Tiro_Devanagari_Sanskrit',serif] text-base text-[#B8860B]/60 mb-1">
          {chapter.sanskrit}
        </p>
        <p className="text-[#8A8580]">{chapter.meaning}</p>
        <div className="mt-3">
          <span className="text-xs tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-3 py-1">
            {chapter.verses} verses
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E8E4DF] my-6" />

      {/* Key Verses */}
      {verses.length > 0 && (
        <div className="mb-10">
          <h2 className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-[#2D2A26] mb-5">
            Key Verses
          </h2>
          <div className="flex flex-col gap-3">
            {verses.map((verse) => (
              <div
                key={verse.verse}
                className="bg-white border border-[#E8E4DF] rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-[#D4C9BC] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                onClick={() =>
                  navigate(`/verse/${chapter.id}/${verse.verse}`)
                }
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-2.5 py-0.5">
                    Verse {verse.verse}
                  </span>
                  <span className="text-[#8A8580] text-xs">Read →</span>
                </div>
                <p className="text-[#2D2A26] leading-relaxed text-sm">
                  &quot;{verse.translation.slice(0, 160)}...&quot;
                </p>
                <div className="mt-3 flex gap-1.5 flex-wrap">
                  {verse.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[0.6rem] tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All verse numbers */}
      <div>
        <h2 className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-[#2D2A26] mb-5">
          All Verses
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-2">
          {verseNums.map((n) => {
            const hasData = verses.some((v) => v.verse === n);
            return (
              <button
                key={n}
                onClick={() =>
                  hasData && navigate(`/verse/${chapter.id}/${n}`)
                }
                className={`py-2 rounded-lg text-sm transition-all duration-200 border ${
                  hasData
                    ? "border-[#B8860B]/25 bg-[#B8860B]/6 text-[#B8860B] font-semibold cursor-pointer hover:bg-[#B8860B]/12"
                    : "border-[#E8E4DF] bg-[#F3F0EB] text-[#B8ADA0] cursor-default"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        <p className="text-[#8A8580] text-xs mt-3">
          ✦ Highlighted verses have full AI explanations available
        </p>
      </div>
    </div>
  );
}
