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
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste 🙏 I am Arya, your Gita guide. What is weighing on your heart today? Share freely — whether it's a life struggle, a question about existence, or simply curiosity about ancient wisdom.",
    },
  ]);
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
        await new Promise((r) => setTimeout(r, 1500));
        const responses = [
          "The Gita teaches us in Chapter 2 verse 47: 'You have the right to perform your duties, but not to the fruits.' Focus on your actions, not outcomes. What specific situation are you navigating?",
          "Krishna speaks directly to this in Chapter 6: 'The mind is the friend of the one who has conquered it, and the enemy of one who has not.' The mind can be your greatest ally with practice. How does this resonate with you?",
          "This is a beautiful question. The Gita's core teaching is equanimity — being unshaken by both joy and sorrow. As Chapter 2 verse 14 says, pleasures and pains are temporary, like seasons. They shall pass.",
          "Chapter 18 verse 66 holds the ultimate answer: 'Surrender to Me completely, and I shall free you from all fear.' This surrender isn't weakness — it's the deepest form of trust. What do you find difficult to let go of?",
          "The Gita sees every challenge as an invitation to grow. Chapter 3 says: 'Perform your duty without attachment to results.' Your situation is your dharma in action. What feels most unclear to you right now?",
        ];
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: responses[Math.floor(Date.now() / 10000) % responses.length],
          },
        ]);
      } else {
        const history = newMessages.slice(1).map((m) => ({
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
        const answer =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't respond right now. Please try again.";
        setMessages((prev) => [...prev, { role: "ai", text: answer }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col h-[calc(100vh)] max-w-[720px] mx-auto">
      {/* Chat header */}
      <div className="py-4 px-6 border-b border-[#E8E4DF] flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-lg shrink-0">
          🕉️
        </div>
        <div>
          <h2 className="font-['Cormorant_Garamond',serif] text-base font-semibold text-[#2D2A26] mb-0">
            Arya — Your Gita Guide
          </h2>
          <p className="text-[#8A8580] text-xs">
            Powered by Bhagavad Gita wisdom
            {!import.meta.env.VITE_AI_API_KEY && " · Demo mode"}
          </p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-500/70" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-5 px-6 flex flex-col gap-3">
        {/* Starters */}
        {messages.length === 1 && (
          <div className="mt-2">
            <p className="text-[#8A8580] text-xs mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  className="text-xs text-[#B8860B]/70 bg-[#B8860B]/6 border border-[#B8860B]/12 rounded-full px-3 py-1.5 cursor-pointer transition-all duration-200 hover:bg-[#B8860B]/12"
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
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
            style={{ animation: "fadeInUp 0.3s ease" }}
          >
            {m.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-sm mr-2 shrink-0 self-end">
                🕉
              </div>
            )}
            <div
              className={
                m.role === "user"
                  ? "bg-[#B8860B] text-white rounded-[18px_18px_4px_18px] py-3 px-4 max-w-[75%] text-sm leading-relaxed"
                  : "bg-white text-[#2D2A26] border border-[#E8E4DF] rounded-[18px_18px_18px_4px] py-3 px-4 max-w-[80%] text-sm leading-[1.7]"
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-sm">
              🕉
            </div>
            <div className="bg-white border border-[#E8E4DF] rounded-[18px_18px_18px_4px] py-3 px-4 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8ADA0] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8ADA0] animate-pulse [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8ADA0] animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="py-4 px-6 border-t border-[#E8E4DF] shrink-0">
        <div className="flex gap-2.5">
          <input
            className="flex-1 py-2.5 px-4 bg-white border border-[#E8E4DF] rounded-xl text-[#2D2A26] text-sm outline-none transition-all duration-300 focus:border-[#B8860B]/30 focus:shadow-[0_0_0_3px_rgba(184,134,11,0.06)] placeholder:text-[#B8ADA0]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && sendMessage()
            }
            placeholder="Share what's on your mind..."
            disabled={loading}
            id="chat-input"
          />
          <button
            className="bg-[#B8860B] text-white py-2.5 px-5 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[#9A7209] text-sm shrink-0 disabled:opacity-40 disabled:cursor-default"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            {loading ? "..." : "Send ↑"}
          </button>
        </div>
        <p className="text-[#B8ADA0] text-[0.7rem] mt-2 text-center">
          Add{" "}
          <code className="bg-[#F3F0EB] px-1.5 py-0.5 rounded text-[#8A8580]">
            VITE_AI_API_KEY
          </code>{" "}
          in your .env file to enable live AI
        </p>
      </div>
    </div>
  );
}
