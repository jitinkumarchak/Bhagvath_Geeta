import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVerse, getChapter, VERSES } from "../data/gita";

export default function VerseDetail() {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();
  const verse = getVerse(chapterId, verseId);
  const chapter = getChapter(chapterId);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chapterVerses = VERSES.filter((v) => v.chapter === Number(chapterId));
  const currentIdx = chapterVerses.findIndex((v) => v.verse === Number(verseId));
  const prevVerse = chapterVerses[currentIdx - 1];
  const nextVerse = chapterVerses[currentIdx + 1];

  const sendMessage = async () => {
    if (!question.trim()) return;
    const userMsg = question;
    setQuestion("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      if (!apiKey) {
        await new Promise((r) => setTimeout(r, 1200));
        const placeholders = [
          `This verse from Chapter ${verse.chapter} teaches us about "${verse.topics[0]}". ${verse.commentary}`,
          `The essence of this verse lies in the teaching: "${verse.translation}" — It reminds us that ${verse.topics.slice(0, 2).join(" and ")} are core to balanced living.`,
          `Krishna's message here is profound. When we understand "${verse.translation.slice(0, 80)}...", we begin to see how detachment and right action transform our relationship with outcomes.`,
        ];
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: placeholders[Math.floor(Math.random() * placeholders.length)],
          },
        ]);
      } else {
        const systemPrompt = `You are a wise, compassionate Bhagavad Gita teacher. You are currently discussing Chapter ${verse.chapter}, Verse ${verse.verse}.\n\nThe verse: "${verse.translation}"\nSanskrit: ${verse.sanskrit}\nTopics: ${verse.topics.join(", ")}\nCommentary: ${verse.commentary}\n\nAnswer questions about this verse with wisdom, warmth, and practical insight. Connect ancient teachings to modern life. Keep answers concise (3-5 sentences max).`;

        const res = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
            apiKey,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: systemPrompt + "\n\n" + userMsg }],
                },
              ],
            }),
          }
        );
        const data = await res.json();
        const answer =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't find an answer right now.";
        setMessages((prev) => [...prev, { role: "ai", text: answer }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "There was an error. Please try again." },
      ]);
    }
    setLoading(false);
  };

  if (!verse)
    return (
      <div className="min-h-screen pt-16 text-center py-16">
        <p className="text-[#8A8580] mb-4">
          This verse isn&apos;t in our database yet.
        </p>
        <button
          className="bg-transparent text-[#B8860B] font-medium py-2.5 px-6 rounded-full border border-[#B8860B]/25 cursor-pointer transition-all duration-300 hover:bg-[#B8860B]/5"
          onClick={() => navigate(`/chapter/${chapterId}`)}
        >
          ← Back to Chapter
        </button>
      </div>
    );

  return (
    <div className="min-h-screen pt-16 max-w-[750px] mx-auto px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(`/chapter/${chapterId}`)}
        className="bg-transparent border-none cursor-pointer text-[#B8860B] mb-6 flex items-center gap-1 text-sm hover:underline"
      >
        ← {chapter?.name || `Chapter ${chapterId}`}
      </button>

      {/* Verse header */}
      <div style={{ animation: "fadeInUp 0.4s ease" }}>
        <div className="flex gap-2 mb-5 flex-wrap">
          <span className="text-xs tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-3 py-1">
            Chapter {verse.chapter}
          </span>
          <span className="text-xs tracking-wider uppercase text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-3 py-1">
            Verse {verse.verse}
          </span>
          {verse.topics.map((t) => (
            <span
              key={t}
              className="text-[0.65rem] tracking-wider uppercase text-[#8A8580] bg-[#F3F0EB] border border-[#E8E4DF] rounded-full px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Sanskrit */}
        <div className="bg-white border border-[#E8E4DF] rounded-xl p-8 mb-6 text-center">
          <p className="font-['Tiro_Devanagari_Sanskrit',serif] text-lg leading-[2.2] text-[#6B4E2F]">
            {verse.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p className="italic text-[#B8860B]/50 text-sm leading-relaxed mb-5 text-center">
          {verse.transliteration}
        </p>

        {/* Divider */}
        <div className="h-px bg-[#E8E4DF] my-6" />

        {/* Translation */}
        <div className="mb-5">
          <h3 className="text-xs text-[#8A8580] tracking-[0.1em] uppercase mb-3">
            Translation
          </h3>
          <p className="text-lg leading-[1.9] text-[#2D2A26]">
            &quot;{verse.translation}&quot;
          </p>
        </div>

        {/* Commentary */}
        {verse.commentary && (
          <div className="p-5 bg-[#FAF8F5] rounded-xl border-l-3 border-[#B8860B]/25 mb-6">
            <h3 className="text-xs text-[#B8860B] tracking-[0.15em] uppercase mb-3">
              Commentary
            </h3>
            <p className="text-[#6B6560] leading-[1.9] text-base">
              {verse.commentary}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 mb-6 flex-wrap">
        <button
          className="bg-[#B8860B] text-white font-medium py-2.5 px-6 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] text-sm"
          onClick={() => setChatOpen((p) => !p)}
        >
          ✦ {chatOpen ? "Close Chat" : "Ask AI About This Verse"}
        </button>
        <button
          className="bg-transparent text-[#8A8580] py-2.5 px-5 rounded-full border border-[#E8E4DF] cursor-pointer transition-all duration-300 hover:bg-[#F0EDE8] hover:text-[#2D2A26] text-sm"
          onClick={() => {
            const text = `"${verse.translation}" — Bhagavad Gita ${verse.chapter}.${verse.verse}`;
            navigator.clipboard?.writeText(text);
          }}
        >
          📋 Copy Verse
        </button>
        <button
          className="bg-transparent text-[#8A8580] py-2.5 px-5 rounded-full border border-[#E8E4DF] cursor-pointer transition-all duration-300 hover:bg-[#F0EDE8] hover:text-[#2D2A26] text-sm"
          onClick={() => {
            const text = encodeURIComponent(
              `"${verse.translation}" — Bhagavad Gita ${verse.chapter}.${verse.verse}`
            );
            window.open(`https://wa.me/?text=${text}`, "_blank");
          }}
        >
          📱 Share
        </button>
      </div>

      {/* Inline AI Chat */}
      {chatOpen && (
        <div
          className="bg-white border border-[#E8E4DF] rounded-2xl p-5 mb-6"
          style={{ animation: "fadeInUp 0.3s ease" }}
        >
          <h3 className="text-base font-['Cormorant_Garamond',serif] font-semibold text-[#2D2A26] mb-4">
            Ask about this verse
          </h3>

          {/* Suggested questions */}
          {messages.length === 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {[
                "Explain in simple words",
                "How does this apply to modern life?",
                "Give me a real-life example",
                "What philosophy does this represent?",
              ].map((q) => (
                <button
                  key={q}
                  className="text-xs text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-3 py-1.5 cursor-pointer transition-all duration-200 hover:bg-[#B8860B]/12"
                  onClick={() => setQuestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="flex flex-col gap-3 max-h-80 overflow-y-auto mb-4 pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "bg-[#B8860B] text-white rounded-[18px_18px_4px_18px] py-3 px-4 max-w-[75%] self-end text-sm"
                      : "bg-[#F3F0EB] text-[#2D2A26] border border-[#E8E4DF] rounded-[18px_18px_18px_4px] py-3 px-4 max-w-[80%] self-start leading-relaxed text-sm"
                  }
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="bg-[#F3F0EB] border border-[#E8E4DF] rounded-[18px_18px_18px_4px] py-3 px-4 self-start flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8ADA0] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8ADA0] animate-pulse [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8ADA0] animate-pulse [animation-delay:0.4s]" />
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              className="flex-1 py-2.5 px-4 bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl text-[#2D2A26] text-sm outline-none transition-all duration-300 focus:border-[#B8860B]/30 focus:shadow-[0_0_0_3px_rgba(184,134,11,0.06)] placeholder:text-[#B8ADA0]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about this verse..."
            />
            <button
              className="bg-[#B8860B] text-white py-2.5 px-5 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] text-sm shrink-0 disabled:opacity-40 disabled:cursor-default"
              onClick={sendMessage}
              disabled={loading || !question.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex justify-between gap-3 flex-wrap">
        {prevVerse ? (
          <button
            className="bg-transparent text-[#8A8580] py-2.5 px-5 rounded-full border border-[#E8E4DF] cursor-pointer transition-all duration-300 hover:bg-[#F0EDE8] hover:text-[#2D2A26] text-sm"
            onClick={() =>
              navigate(`/verse/${chapterId}/${prevVerse.verse}`)
            }
          >
            ← Verse {prevVerse.verse}
          </button>
        ) : (
          <div />
        )}
        {nextVerse && (
          <button
            className="bg-transparent text-[#8A8580] py-2.5 px-5 rounded-full border border-[#E8E4DF] cursor-pointer transition-all duration-300 hover:bg-[#F0EDE8] hover:text-[#2D2A26] text-sm"
            onClick={() =>
              navigate(`/verse/${chapterId}/${nextVerse.verse}`)
            }
          >
            Verse {nextVerse.verse} →
          </button>
        )}
      </div>
    </div>
  );
}
