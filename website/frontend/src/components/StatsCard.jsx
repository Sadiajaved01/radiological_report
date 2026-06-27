import React from "react";

export default function StatsCard({ title, value, color = "#2563eb" }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        minWidth: "220px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color,
          marginTop: "10px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}
