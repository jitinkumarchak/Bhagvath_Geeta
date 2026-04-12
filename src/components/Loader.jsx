import React from "react";
import { useTheme } from "../App";

export default function Loader({ text = "Loading wisdom..." }) {
  const { dark } = useTheme();

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "20px", padding: "64px 32px",
    }}>
      <div style={{ position: "relative", width: "56px", height: "56px" }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: dark ? "rgba(196,154,60,0.5)" : "rgba(160,120,40,0.4)",
          borderRightColor: dark ? "rgba(196,154,60,0.3)" : "rgba(160,120,40,0.2)",
          animation: "spinSlow 1.5s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem",
          color: dark ? "#C49A3C" : "#A07828",
          opacity: 0.7,
          animation: "breathe 3s ease-in-out infinite",
        }}>
          ॐ
        </div>
      </div>
      <p style={{ color: dark ? "#6A6055" : "#A09888", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
        {text}
      </p>
    </div>
  );
}
