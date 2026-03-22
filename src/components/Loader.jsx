import React from "react";

export default function Loader({ text = "Loading wisdom..." }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "1.5rem", padding: "4rem 2rem",
    }}>
      {/* Om symbol spinning */}
      <div style={{ position: "relative", width: "64px", height: "64px" }}>
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "var(--color-gold)",
          borderRightColor: "var(--color-saffron)",
          animation: "spin-slow 1.2s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.8rem",
          background: "var(--grad-gold)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          ॐ
        </div>
      </div>
      <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
        {text}
      </p>
    </div>
  );
}
