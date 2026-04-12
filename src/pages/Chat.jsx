import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../App";

const SYSTEM_PROMPT = `You are a wise, compassionate Bhagavad Gita teacher named Arya. You deeply understand the Bhagavad Gita's 18 chapters and 700 verses, and you help modern people apply this ancient wisdom to their everyday lives.

Your personality:
- Warm, wise, and gentle — like a spiritual elder who truly cares
- Grounded and practical — you connect ancient teachings to real modern situations
- Never preachy — you share wisdom, not lecture
- Occasionally cite specific verses (e.g., "As Krishna says in 2.47...")

Your approach:
- Listen deeply to what the person is struggling with
- Offer relevant Gita wisdom and verse references
- Give practical, actionable insight
- Keep responses focused (3-6 sentences ideal)
- End with a gentle question or reflection to deepen the conversation

If someone asks about stress, anxiety, career, relationships, purpose, grief, anger, fear, or any life struggle — always connect it to Gita wisdom.`;

const STARTERS = [
  "I'm feeling anxious about my future",
  "What does the Gita say about karma?",
  "How do I deal with failure?",
  "I'm struggling with anger",
  "What is dharma?",
  "I feel lost in life",
];

export default function Chat() {
  const { dark } = useTheme();
  const [messages, setMessages] = useState([{
    role: "ai",
    text: "Namaste 🙏 I am Arya, your Gita guide. What is weighing on your heart today? Share freely — whether it's a life struggle, a question about existence, or simply curiosity about ancient wisdom.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const c = {
    bg: dark ? "#121210" : "#F0EBE3",
    surface: dark ? "#1C1A17" : "#FFFFFF",
    surfaceDim: dark ? "#161412" : "#F5F1EC",
    border: dark ? "#2E2B27" : "#DDD7CE",
    gold: dark ? "#C49A3C" : "#A07828",
    goldSoft: dark ? "rgba(196,154,60,0.1)" : "rgba(160,120,40,0.08)",
    tagBorder: dark ? "rgba(196,154,60,0.18)" : "rgba(160,120,40,0.12)",
    text: dark ? "#E8E0D4" : "#2A2520",
    textMuted: dark ? "#6A6055" : "#A09888",
    textSecondary: dark ? "#9A9080" : "#7A7068",
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim() || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      if (!apiKey) {
        await new Promise((r) => setTimeout(r, 1500));
        const responses = [
          "The Gita teaches us in Chapter 2 verse 47: 'You have the right to perform your duties, but not to the fruits.' Focus on your actions, not outcomes. What specific situation are you navigating?",
          "Krishna speaks directly to this in Chapter 6: 'The mind is the friend of the one who has conquered it, and the enemy of one who has not.' How does this resonate with you?",
          "The Gita's core teaching is equanimity — being unshaken by both joy and sorrow. As Chapter 2 verse 14 says, pleasures and pains are temporary, like seasons. They shall pass.",
          "Chapter 18 verse 66 holds the ultimate answer: 'Surrender to Me completely, and I shall free you from all fear.' This surrender isn't weakness — it's the deepest form of trust.",
          "The Gita sees every challenge as an invitation to grow. Chapter 3 says: 'Perform your duty without attachment to results.' What feels most unclear to you right now?",
        ];
        setMessages((prev) => [...prev, { role: "ai", text: responses[Math.floor(Date.now() / 10000) % responses.length] }]);
      } else {
        const history = newMessages.slice(1).map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] }));
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents: history }),
        });
        const data = await res.json();
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't respond right now. Please try again.";
        setMessages((prev) => [...prev, { role: "ai", text: answer }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "64px", display: "flex", flexDirection: "column", height: "100vh", maxWidth: "720px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px 12px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "50%",
          background: c.goldSoft, border: `1px solid ${c.tagBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.2rem", flexShrink: 0,
          animation: "breathe 4s ease-in-out infinite",
        }}>🕉️</div>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: c.text }}>Arya — Your Gita Guide</h2>
          <p style={{ color: c.textMuted, fontSize: "0.75rem" }}>
            Powered by Bhagavad Gita wisdom{!import.meta.env.VITE_AI_API_KEY && " · Demo mode"}
          </p>
        </div>
        <div style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.4)" }} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.length === 1 && (
          <div style={{ marginTop: "8px" }}>
            <p style={{ color: c.textMuted, fontSize: "0.75rem", marginBottom: "10px" }}>Try asking:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {STARTERS.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} style={{
                  fontSize: "0.75rem", color: c.gold, background: c.goldSoft,
                  border: `1px solid ${c.tagBorder}`, borderRadius: "20px",
                  padding: "6px 14px", cursor: "pointer", transition: "all 0.2s",
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animation: "fadeInUp 0.3s ease" }}>
            {m.role === "ai" && (
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: c.goldSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", marginRight: "8px", flexShrink: 0, alignSelf: "flex-end" }}>🕉</div>
            )}
            <div style={{
              background: m.role === "user" ? c.gold : c.surface,
              color: m.role === "user" ? "#fff" : c.text,
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "12px 16px",
              maxWidth: m.role === "user" ? "75%" : "80%",
              fontSize: "0.88rem", lineHeight: 1.7,
              border: m.role === "ai" ? `1px solid ${c.border}` : "none",
              boxShadow: m.role === "user"
                ? dark ? "0 2px 10px rgba(196,154,60,0.15)" : "0 2px 10px rgba(160,120,40,0.12)"
                : dark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.03)",
            }}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: c.goldSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>🕉</div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: "6px", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c.textMuted, display: "inline-block", animation: `dotPulse 1.4s ease-in-out ${i * 0.16}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 24px 20px", borderTop: `1px solid ${c.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()} placeholder="Share what's on your mind..." disabled={loading} id="chat-input"
            style={{ flex: 1, padding: "10px 16px", background: c.surface, border: `1px solid ${c.border}`, borderRadius: "12px", color: c.text, fontSize: "0.88rem", outline: "none", transition: "border-color 0.3s", fontFamily: "inherit" }} />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
            style={{ background: c.gold, color: "#fff", padding: "10px 20px", borderRadius: "12px", border: "none", cursor: loading || !input.trim() ? "default" : "pointer", fontSize: "0.88rem", opacity: loading || !input.trim() ? 0.4 : 1, transition: "all 0.3s", flexShrink: 0 }}>
            {loading ? "..." : "Send ↑"}
          </button>
        </div>
        <p style={{ color: c.textMuted, fontSize: "0.68rem", marginTop: "8px", textAlign: "center" }}>
          Add <code style={{ background: c.surfaceDim, padding: "1px 6px", borderRadius: "4px", color: c.textSecondary }}>VITE_AI_API_KEY</code> in your .env file to enable live AI
        </p>
      </div>
    </div>
  );
}
