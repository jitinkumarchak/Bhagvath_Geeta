import React from "react";
import { useNavigate } from "react-router-dom";
import { getDailyVerse, VERSES } from "../data/gita";

export default function Daily() {
  const navigate = useNavigate();
  const daily = getDailyVerse();

  // Get a few more recent "daily" verses for context
  const dayIndex = Math.floor(Date.now() / 86400000) % VERSES.length;
  const recent = [
    VERSES[(dayIndex - 1 + VERSES.length) % VERSES.length],
    VERSES[(dayIndex - 2 + VERSES.length) % VERSES.length],
  ].filter(v => v.verse !== daily.verse);

  return (
    <div className="page" style={{ maxWidth: "750px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeInUp 0.5s ease" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>☀️</div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Daily Wisdom</h1>
        <p style={{ color: "var(--color-muted)" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Today's verse — big card */}
      <div
        className="card"
        style={{
          padding: "2.5rem",
          marginBottom: "2rem",
          textAlign: "center",
          background: "linear-gradient(145deg, rgba(245,200,66,0.08) 0%, rgba(255,123,28,0.05) 100%)",
          animation: "fadeInUp 0.5s ease 0.1s backwards",
        }}
      >
        <div style={{
          display: "inline-flex", padding: "0.4rem 1rem",
          background: "var(--grad-gold)", borderRadius: "99px",
          color: "#000", fontWeight: 600, fontSize: "0.8rem",
          marginBottom: "1.5rem",
        }}>
          ✨ Today's Verse
        </div>

        <p className="sanskrit" style={{ fontSize: "1.1rem", lineHeight: 2.2, marginBottom: "1.5rem" }}>
          {daily.sanskrit}
        </p>

        <div className="divider" />

        <p style={{
          fontSize: "1.1rem", lineHeight: 1.9,
          color: "var(--color-cream)",
          marginBottom: "1.5rem",
        }}>
          "{daily.translation}"
        </p>

        <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          — Bhagavad Gita {daily.chapter}.{daily.verse}
        </p>

        {daily.commentary && (
          <div style={{
            padding: "1.25rem",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "var(--radius-md)",
            textAlign: "left",
            marginBottom: "1.5rem",
          }}>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>
              💡 {daily.commentary}
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-primary"
            onClick={() => navigate(`/verse/${daily.chapter}/${daily.verse}`)}
          >
            ✨ Explore & Ask AI
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              const text = `"${daily.translation}" — Bhagavad Gita ${daily.chapter}.${daily.verse}`;
              navigator.clipboard?.writeText(text);
            }}
          >
            📋 Copy
          </button>
        </div>
      </div>

      {/* Reflection prompt */}
      <div
        className="card"
        style={{ padding: "1.75rem", marginBottom: "2rem", animation: "fadeInUp 0.5s ease 0.2s backwards" }}
      >
        <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "var(--color-cream)" }}>
          🧘 Today's Reflection
        </h3>
        <p style={{ color: "var(--color-muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Sit quietly for a moment. Read the verse again. Ask yourself:{" "}
          <em style={{ color: "var(--color-text)" }}>
            "Where in my life today can I apply this teaching?"
          </em>
        </p>
      </div>

      {/* Recent verses */}
      {recent.length > 0 && (
        <div style={{ animation: "fadeInUp 0.5s ease 0.3s backwards" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>Recent Verses</h2>
          {recent.map(v => (
            <div
              key={`${v.chapter}-${v.verse}`}
              className="card"
              style={{ padding: "1.25rem", marginBottom: "0.75rem", cursor: "pointer" }}
              onClick={() => navigate(`/verse/${v.chapter}/${v.verse}`)}
            >
              <span className="tag" style={{ marginBottom: "0.5rem" }}>Ch {v.chapter} · V {v.verse}</span>
              <p style={{ color: "var(--color-text)", fontSize: "0.9rem", lineHeight: 1.7, marginTop: "0.5rem" }}>
                "{v.translation.slice(0, 120)}..."
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
