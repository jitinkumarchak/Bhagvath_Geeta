import React, { useState } from "react";
import { ALL_TOPICS, getVersesByTopic } from "../data/gita";
import VerseCard from "../components/VerseCard";

const TOPIC_EMOJIS = {
  karma: "⚡", dharma: "⚖️", soul: "✨", death: "🌙",
  action: "🎯", duty: "🛡️", detachment: "🍃", mind: "🧠",
  meditation: "🧘", equanimity: "⚖️", discipline: "💪",
  devotion: "🙏", surrender: "🌊", liberation: "🕊️",
  leadership: "👑", compassion: "💝", ego: "🪞",
  grief: "💔", war: "⚔️", yoga: "🌀", faith: "🕯️",
  divine: "🌟", eternity: "♾️", suffering: "😮‍💨",
};

export default function Explore() {
  const [active, setActive] = useState(null);
  const results = active ? getVersesByTopic(active) : [];

  return (
    <div className="page" style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeInUp 0.5s ease" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌿</div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>Explore by Topic</h1>
        <p style={{ color: "var(--color-muted)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.8 }}>
          Dive deep into the Gita's teachings by choosing a theme that speaks to you.
        </p>
      </div>

      {/* Topic cloud */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "0.6rem",
        justifyContent: "center", marginBottom: "3rem",
        animation: "fadeInUp 0.5s ease 0.1s backwards",
      }}>
        {ALL_TOPICS.map(topic => (
          <button
            key={topic}
            className={`tag${active === topic ? " active" : ""}`}
            style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem" }}
            onClick={() => setActive(active === topic ? null : topic)}
          >
            {TOPIC_EMOJIS[topic] || "•"} {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </button>
        ))}
      </div>

      {/* Results */}
      {active && (
        <div style={{ animation: "fadeInUp 0.4s ease" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", textTransform: "capitalize" }}>
            {TOPIC_EMOJIS[active] || "•"} {active}
          </h2>
          <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            {results.length} {results.length === 1 ? "verse" : "verses"} on this topic
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {results.map(v => <VerseCard key={`${v.chapter}-${v.verse}`} verse={v} />)}
          </div>
        </div>
      )}

      {!active && (
        <p style={{ textAlign: "center", color: "var(--color-muted)" }}>
          Select a topic above to see related verses ↑
        </p>
      )}
    </div>
  );
}
