import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        ClinicalBERT
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Link style={link} to="/dashboard">
          Dashboard
        </Link>

        <Link style={link} to="/classify">
          Text Analysis
        </Link>

        <Link style={link} to="/pdf-upload">
          PDF Upload
        </Link>

        <Link style={link} to="/history">
          History
        </Link>

        <Link style={link} to="/analytics">
          Analytics
        </Link>

        <Link style={link} to="/comparison">
          Model Comparison
        </Link>

        <Link style={link} to="/profile">
          Profile
        </Link>

        <Link style={link} to="/about">
          About
        </Link>

        <Link style={link} to="/contact">
          Contact
        </Link>
      </div>
    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none",
  padding: "12px",
  background: "#1e293b",
  borderRadius: "10px",
};
