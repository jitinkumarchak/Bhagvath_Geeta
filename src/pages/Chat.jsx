import React, { useState, useRef, useEffect } from "react";

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
  const [messages, setMessages] = useState([{
    role: "ai",
    text: "Namaste 🙏 I am Arya, your Gita guide. What is weighing on your heart today? Share freely — whether it's a life struggle, a question about existence, or simply curiosity about ancient wisdom.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

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
        // Smart placeholder responses
        await new Promise(r => setTimeout(r, 1500));
        const responses = [
          "The Gita teaches us in Chapter 2 verse 47: 'You have the right to perform your duties, but not to the fruits.' Focus on your actions, not outcomes. What specific situation are you navigating?",
          "Krishna speaks directly to this in Chapter 6: 'The mind is the friend of the one who has conquered it, and the enemy of one who has not.' The mind can be your greatest ally with practice. How does this resonate with you?",
          "This is a beautiful question. The Gita's core teaching is equanimity — being unshaken by both joy and sorrow. As Chapter 2 verse 14 says, pleasures and pains are temporary, like seasons. They shall pass.",
          "Chapter 18 verse 66 holds the ultimate answer: 'Surrender to Me completely, and I shall free you from all fear.' This surrender isn't weakness — it's the deepest form of trust. What do you find difficult to let go of?",
          "The Gita sees every challenge as an invitation to grow. Chapter 3 says: 'Perform your duty without attachment to results.' Your situation is your dharma in action. What feels most unclear to you right now?",
        ];
        setMessages(prev => [...prev, {
          role: "ai",
          text: responses[Math.floor(Date.now() / 10000) % responses.length],
        }]);
      } else {
        // Build conversation history for Gemini
        const history = newMessages.slice(1).map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: history,
            }),
          }
        );
        const data = await res.json();
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text
          || "I couldn't respond right now. Please try again.";
        setMessages(prev => [...prev, { role: "ai", text: answer }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="page" style={{
      display: "flex", flexDirection: "column",
      height: "calc(100vh - 68px)",
      maxWidth: "780px", margin: "0 auto",
    }}>
      {/* Chat header */}
      <div style={{
        padding: "1.5rem 2rem 1rem",
        borderBottom: "1px solid var(--color-border)",
        display: "flex", alignItems: "center", gap: "1rem",
        flexShrink: 0,
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: "var(--grad-gold)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.4rem", flexShrink: 0,
        }}>
          🕉️
        </div>
        <div>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.1rem" }}>Arya — Your Gita Guide</h2>
          <p style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}>
            Powered by Bhagavad Gita wisdom
            {!import.meta.env.VITE_AI_API_KEY && " · Demo mode"}
          </p>
        </div>
        <div style={{
          marginLeft: "auto",
          width: "10px", height: "10px", borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 8px rgba(34,197,94,0.6)",
        }} />
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "1.5rem 2rem",
        display: "flex", flexDirection: "column", gap: "1rem",
      }}>
        {/* Starter suggestions (only when at initial state) */}
        {messages.length === 1 && (
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
              Try asking:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {STARTERS.map(s => (
                <button
                  key={s}
                  className="tag"
                  style={{ cursor: "pointer", fontSize: "0.8rem" }}
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              animation: "fadeInUp 0.3s ease",
            }}
          >
            {m.role === "ai" && (
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "var(--grad-gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", marginRight: "0.5rem", flexShrink: 0, alignSelf: "flex-end",
              }}>
                🕉
              </div>
            )}
            <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "var(--grad-gold)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem",
            }}>🕉</div>
            <div className="bubble-ai" style={{ display: "flex", gap: "5px", alignItems: "center", padding: "0.75rem 1rem" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span key={i} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "var(--color-gold-dim)",
                  display: "inline-block",
                  animation: `pulse-ring 1.2s ease ${d}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: "1rem 2rem 1.5rem",
        borderTop: "1px solid var(--color-border)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Share what's on your mind..."
            disabled={loading}
            style={{ flex: 1 }}
            id="chat-input"
          />
          <button
            className="btn-primary"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{ flexShrink: 0, padding: "0.65rem 1.4rem" }}
          >
            {loading ? "..." : "Send ↑"}
          </button>
        </div>
        <p style={{ color: "var(--color-muted)", fontSize: "0.75rem", marginTop: "0.6rem", textAlign: "center" }}>
          Add <code style={{ background: "rgba(255,255,255,0.06)", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>VITE_AI_API_KEY</code> in your .env file to enable live AI
        </p>
      </div>
    </div>
  );
}
