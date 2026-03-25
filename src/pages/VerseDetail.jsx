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

  // Find next / prev verses in dataset
  const chapterVerses = VERSES.filter(v => v.chapter === Number(chapterId));
  const currentIdx = chapterVerses.findIndex(v => v.verse === Number(verseId));
  const prevVerse = chapterVerses[currentIdx - 1];
  const nextVerse = chapterVerses[currentIdx + 1];

  const sendMessage = async () => {
    if (!question.trim()) return;
    const userMsg = question;
    setQuestion("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      if (!apiKey) {
        // Thoughtful placeholder
        await new Promise(r => setTimeout(r, 1200));
        const placeholders = [
          `This verse from Chapter ${verse.chapter} teaches us about "${verse.topics[0]}". ${verse.commentary}`,
          `The essence of this verse lies in the teaching: "${verse.translation}" — It reminds us that ${verse.topics.slice(0, 2).join(" and ")} are core to balanced living.`,
          `Krishna's message here is profound. When we understand "${verse.translation.slice(0, 80)}...", we begin to see how detachment and right action transform our relationship with outcomes.`,
        ];
        setMessages(prev => [...prev, {
          role: "ai",
          text: placeholders[Math.floor(Math.random() * placeholders.length)],
        }]);
      } else {
        const systemPrompt = `You are a wise, compassionate Bhagavad Gita teacher. You are currently discussing Chapter ${verse.chapter}, Verse ${verse.verse}.

The verse: "${verse.translation}"
Sanskrit: ${verse.sanskrit}
Topics: ${verse.topics.join(", ")}
Commentary: ${verse.commentary}

Answer questions about this verse with wisdom, warmth, and practical insight. Connect ancient teachings to modern life. Keep answers concise (3-5 sentences max).`;

        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: systemPrompt + "\n\n" + userMsg }] }
            ]
          }),
        });
        const data = await res.json();
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't find an answer right now.";
        setMessages(prev => [...prev, { role: "ai", text: answer }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "There was an error. Please try again." }]);
    }
    setLoading(false);
  };

  if (!verse) return (
    <div className="page" style={{ textAlign: "center", padding: "4rem" }}>
      <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>This verse isn't in our database yet.</p>
      <button className="btn-ghost" onClick={() => navigate(`/chapter/${chapterId}`)}>← Back to Chapter</button>
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Back */}
      <button
        onClick={() => navigate(`/chapter/${chapterId}`)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-gold)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
      >
        ← {chapter?.name || `Chapter ${chapterId}`}
      </button>

      {/* Verse header */}
      <div style={{ animation: "fadeInUp 0.4s ease" }}>
        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <span className="tag">Chapter {verse.chapter}</span>
          <span className="tag">Verse {verse.verse}</span>
          {verse.topics.map(t => <span key={t} className="tag" style={{ fontSize: "0.75rem" }}>{t}</span>)}
        </div>

        {/* Sanskrit */}
        <div className="card" style={{
          padding: "2.5rem 2rem",
          marginBottom: "2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle ambient glow behind sanskrit */}
          <div className="anim-pulse" style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "300px", height: "150px", background: "radial-gradient(ellipse, rgba(255,123,28,0.12) 0%, transparent 60%)",
            filter: "blur(40px)", pointerEvents: "none", zIndex: 0
          }} />
          <p className="sanskrit" style={{ fontSize: "1.3rem", lineHeight: 2.2, position: "relative", zIndex: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            {verse.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p style={{
          fontStyle: "italic", color: "var(--color-gold-dim)",
          fontSize: "0.9rem", lineHeight: 1.9,
          marginBottom: "1.5rem", textAlign: "center",
        }}>
          {verse.transliteration}
        </p>

        <div className="divider" />

        {/* Translation */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.85rem", color: "var(--color-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Translation
          </h3>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "var(--color-cream)" }}>
            "{verse.translation}"
          </p>
        </div>

        {/* Commentary */}
        {verse.commentary && (
          <div style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(245,200,66,0.05)",
            borderRadius: "var(--radius-md)",
            borderLeft: "3px solid var(--color-gold-dim)",
            marginBottom: "2rem",
          }}>
            <h3 style={{ fontSize: "0.85rem", color: "var(--color-gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              💡 Commentary
            </h3>
            <p style={{ color: "var(--color-text)", lineHeight: 1.9, fontSize: "1rem" }}>
              {verse.commentary}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => setChatOpen(p => !p)}>
          ✨ {chatOpen ? "Close Chat" : "Ask AI About This Verse"}
        </button>
        <button className="btn-ghost" onClick={() => {
          const text = `"${verse.translation}" — Bhagavad Gita ${verse.chapter}.${verse.verse}`;
          navigator.clipboard?.writeText(text);
        }}>
          📋 Copy Verse
        </button>
        <button className="btn-ghost" onClick={() => {
          const text = encodeURIComponent(`"${verse.translation}" — Bhagavad Gita ${verse.chapter}.${verse.verse}`);
          window.open(`https://wa.me/?text=${text}`, "_blank");
        }}>
          📱 Share
        </button>
      </div>

      {/* Inline AI Chat */}
      {chatOpen && (
        <div style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          marginBottom: "2rem",
          animation: "fadeInUp 0.3s ease",
        }}>
          <h3 style={{ marginBottom: "1rem", fontSize: "1rem", color: "var(--color-cream)" }}>
            ✨ Ask about this verse
          </h3>

          {/* Suggested questions */}
          {messages.length === 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {[
                "Explain in simple words",
                "How does this apply to modern life?",
                "Give me a real-life example",
                "What philosophy does this represent?",
              ].map(q => (
                <button
                  key={q}
                  className="tag"
                  style={{ cursor: "pointer" }}
                  onClick={() => { setQuestion(q); }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div style={{
              display: "flex", flexDirection: "column", gap: "0.75rem",
              maxHeight: "320px", overflowY: "auto", marginBottom: "1rem", paddingRight: "0.25rem",
            }}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "bubble-user" : "bubble-ai"}>
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="bubble-ai" style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                  <span style={{ animation: "pulse-ring 1s ease infinite" }}>●</span>
                  <span style={{ animation: "pulse-ring 1s ease 0.2s infinite" }}>●</span>
                  <span style={{ animation: "pulse-ring 1s ease 0.4s infinite" }}>●</span>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <input
              className="input"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about this verse..."
              style={{ flex: 1 }}
            />
            <button
              className="btn-primary"
              onClick={sendMessage}
              disabled={loading || !question.trim()}
              style={{ flexShrink: 0 }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        {prevVerse ? (
          <button className="btn-ghost" onClick={() => navigate(`/verse/${chapterId}/${prevVerse.verse}`)}>
            ← Verse {prevVerse.verse}
          </button>
        ) : <div />}
        {nextVerse && (
          <button className="btn-ghost" onClick={() => navigate(`/verse/${chapterId}/${nextVerse.verse}`)}>
            Verse {nextVerse.verse} →
          </button>
        )}
      </div>
    </div>
  );
}
