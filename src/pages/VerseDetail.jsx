import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVerse, getChapter, VERSES } from "../data/gita";
import { useTheme } from "../App";

export default function VerseDetail() {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();
  const { dark } = useTheme();
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

  const c = {
    surface: dark ? "#1C1A17" : "#FFFFFF",
    surfaceDim: dark ? "#161412" : "#F5F1EC",
    border: dark ? "#2E2B27" : "#DDD7CE",
    borderHover: dark ? "#3D3830" : "#C9C1B5",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    tagBorder: dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.12)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
    sanskrit: dark ? "#D4B878" : "#5C4020",
    bubbleUser: dark ? "#C49A3C" : "#A07828",
    bubbleAi: dark ? "#1C1A17" : "#F5F1EC",
  };

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
        setMessages((prev) => [...prev, { role: "ai", text: placeholders[Math.floor(Math.random() * placeholders.length)] }]);
      } else {
        const systemPrompt = `You are a wise, compassionate Bhagavad Gita teacher discussing Chapter ${verse.chapter}, Verse ${verse.verse}.\nVerse: "${verse.translation}"\nSanskrit: ${verse.sanskrit}\nTopics: ${verse.topics.join(", ")}\nCommentary: ${verse.commentary}\nAnswer with wisdom, warmth, and practical insight. Keep answers concise (3-5 sentences).`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: systemPrompt + "\n\n" + userMsg }] }] }),
        });
        const data = await res.json();
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't find an answer right now.";
        setMessages((prev) => [...prev, { role: "ai", text: answer }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "There was an error. Please try again." }]);
    }
    setLoading(false);
  };

  if (!verse) return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", textAlign: "center", padding: "64px" }}>
      <p style={{ color: c.textMuted, marginBottom: "16px" }}>This verse isn&apos;t in our database yet.</p>
      <button onClick={() => navigate(`/chapter/${chapterId}`)} style={{ background: "transparent", color: c.gold, fontWeight: 500, padding: "10px 24px", borderRadius: "99px", border: `1px solid ${c.tagBorder}`, cursor: "pointer" }}>
        ← Back to Chapter
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", maxWidth: "750px", margin: "0 auto", padding: "88px 24px 48px" }}>
      <button onClick={() => navigate(`/chapter/${chapterId}`)} style={{ background: "none", border: "none", cursor: "pointer", color: c.gold, marginBottom: "24px", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.9rem" }}>
        ← {chapter?.name || `Chapter ${chapterId}`}
      </button>

      <div style={{ animation: "fadeInUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards", opacity: 0 }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "4px 12px" }}>Chapter {verse.chapter}</span>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "4px 12px" }}>Verse {verse.verse}</span>
          {verse.topics.map((t) => (
            <span key={t} style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: c.textSecondary, background: c.surfaceDim, border: `1px solid ${c.border}`, borderRadius: "20px", padding: "4px 10px" }}>{t}</span>
          ))}
        </div>

        {/* Sanskrit */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: "16px", padding: "32px 24px", marginBottom: "24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: "1.15rem", lineHeight: 2.2, color: c.sanskrit, animation: "breathe 5s ease-in-out infinite" }}>
            {verse.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p style={{ fontStyle: "italic", color: c.textMuted, fontSize: "0.88rem", lineHeight: 1.9, marginBottom: "20px", textAlign: "center" }}>
          {verse.transliteration}
        </p>

        <div style={{ height: "1px", background: c.border, margin: "24px 0" }} />

        {/* Translation */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "0.75rem", color: c.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Translation</h3>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: c.text }}>&quot;{verse.translation}&quot;</p>
        </div>

        {/* Commentary */}
        {verse.commentary && (
          <div style={{ padding: "20px", background: c.surfaceDim, borderRadius: "14px", borderLeft: `3px solid ${c.tagBorder}`, marginBottom: "24px" }}>
            <h3 style={{ fontSize: "0.75rem", color: c.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Commentary</h3>
            <p style={{ color: c.textSecondary, lineHeight: 1.9, fontSize: "0.95rem" }}>{verse.commentary}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        <button onClick={() => setChatOpen((p) => !p)} style={{ background: c.gold, color: "#fff", fontWeight: 500, padding: "10px 24px", borderRadius: "99px", border: "none", cursor: "pointer", transition: "all 0.3s ease", fontSize: "0.88rem" }}>
          ✦ {chatOpen ? "Close Chat" : "Ask AI About This Verse"}
        </button>
        <button onClick={() => { navigator.clipboard?.writeText(`"${verse.translation}" — Bhagavad Gita ${verse.chapter}.${verse.verse}`); }} style={{ background: "transparent", color: c.textSecondary, padding: "10px 20px", borderRadius: "99px", border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.3s ease", fontSize: "0.88rem" }}>
          📋 Copy
        </button>
        <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(`"${verse.translation}" — Bhagavad Gita ${verse.chapter}.${verse.verse}`)}`, "_blank"); }} style={{ background: "transparent", color: c.textSecondary, padding: "10px 20px", borderRadius: "99px", border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.3s ease", fontSize: "0.88rem" }}>
          📱 Share
        </button>
      </div>

      {/* Chat */}
      {chatOpen && (
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: "18px", padding: "20px", marginBottom: "24px", animation: "scaleIn 0.3s ease forwards" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, color: c.text, marginBottom: "16px" }}>Ask about this verse</h3>

          {messages.length === 0 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {["Explain in simple words", "How does this apply to modern life?", "Give me a real-life example", "What philosophy does this represent?"].map((q) => (
                <button key={q} onClick={() => setQuestion(q)} style={{ fontSize: "0.75rem", color: c.gold, background: c.goldSoft, border: `1px solid ${c.tagBorder}`, borderRadius: "20px", padding: "6px 14px", cursor: "pointer", transition: "all 0.2s" }}>{q}</button>
              ))}
            </div>
          )}

          {messages.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "320px", overflowY: "auto", marginBottom: "16px", paddingRight: "4px" }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  background: m.role === "user" ? c.bubbleUser : c.bubbleAi,
                  color: m.role === "user" ? "#fff" : c.text,
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "12px 16px",
                  maxWidth: m.role === "user" ? "75%" : "80%",
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  fontSize: "0.88rem", lineHeight: 1.7,
                  border: m.role === "ai" ? `1px solid ${c.border}` : "none",
                  animation: "fadeInUp 0.3s ease",
                }}>
                  {m.text}
                </div>
              ))}
              {loading && (
                <div style={{ background: c.bubbleAi, border: `1px solid ${c.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 16px", alignSelf: "flex-start", display: "flex", gap: "6px", alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c.textMuted, display: "inline-block", animation: `dotPulse 1.4s ease-in-out ${i * 0.16}s infinite` }} />
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask about this verse..."
              style={{ flex: 1, padding: "10px 16px", background: c.surfaceDim, border: `1px solid ${c.border}`, borderRadius: "12px", color: c.text, fontSize: "0.88rem", outline: "none", transition: "border-color 0.3s", fontFamily: "inherit" }} />
            <button onClick={sendMessage} disabled={loading || !question.trim()}
              style={{ background: c.gold, color: "#fff", padding: "10px 20px", borderRadius: "12px", border: "none", cursor: loading || !question.trim() ? "default" : "pointer", fontSize: "0.88rem", opacity: loading || !question.trim() ? 0.4 : 1, transition: "all 0.3s", flexShrink: 0 }}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        {prevVerse ? (
          <button onClick={() => navigate(`/verse/${chapterId}/${prevVerse.verse}`)} style={{ background: "transparent", color: c.textSecondary, padding: "10px 20px", borderRadius: "99px", border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.3s", fontSize: "0.85rem" }}>← Verse {prevVerse.verse}</button>
        ) : <div />}
        {nextVerse && (
          <button onClick={() => navigate(`/verse/${chapterId}/${nextVerse.verse}`)} style={{ background: "transparent", color: c.textSecondary, padding: "10px 20px", borderRadius: "99px", border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.3s", fontSize: "0.85rem" }}>Verse {nextVerse.verse} →</button>
        )}
      </div>
    </div>
  );
}
