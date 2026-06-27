import React from "react";
import { useState } from "react";
import { predictReport } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Classify() {
  const [report, setReport] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!report.trim()) return alert("Enter report");

    try {
      setLoading(true);
      const data = await predictReport(report);
      setResult(data);
    } catch {
      alert("Error analyzing report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🧬 Radiology AI Classification Engine</h1>

        <p style={styles.subtitle}>Deep ClinicalBERT Diagnostic System</p>

        <textarea
          style={styles.textarea}
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Paste radiology report..."
        />

        <div style={styles.btnRow}>
          <button style={styles.primaryBtn} onClick={handleAnalyze}>
            {loading ? "Scanning..." : "Run AI Scan"}
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </div>

        {result && (
          <div style={styles.resultBox}>
            <h2
              style={{
                color: result.prediction === "Abnormal" ? "#ff4d6d" : "#2dd4bf",
              }}
            >
              {result.prediction}
            </h2>

            <p>Confidence: {result.confidence}%</p>
            <p>Model: {result.model}</p>

            <div style={styles.tag}>
              {result.prediction === "Abnormal"
                ? "⚠ Critical Finding Detected"
                : "✔ Normal Clinical Pattern"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= UNIQUE "NEON MEDICAL AI" THEME ================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    /* UNIQUE BACKGROUND (NOT GENERIC BLUE) */
    background:
      "radial-gradient(circle at top left, #0f172a, #020617 40%, #1e1b4b 100%)",

    fontFamily: "Segoe UI",
    padding: "30px",
  },

  card: {
    width: "100%",
    maxWidth: "850px",

    /* GLASS + DARK MEDICAL PANEL */
    background: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(18px)",

    borderRadius: "22px",
    padding: "35px",

    /* GLOW BORDER (IMPORTANT UNIQUE LOOK) */
    border: "1px solid rgba(45, 212, 191, 0.25)",
    boxShadow: "0 0 40px rgba(45, 212, 191, 0.08)",
  },

  title: {
    color: "#2dd4bf",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "25px",
  },

  textarea: {
    width: "100%",
    height: "250px",
    padding: "15px",

    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.2)",

    background: "#0b1220",
    color: "#e2e8f0",

    fontSize: "14px",
    outline: "none",
  },

  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
  },

  primaryBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",

    /* NEON BUTTON */
    background: "linear-gradient(135deg,#14b8a6,#06b6d4,#3b82f6)",

    color: "white",
    fontWeight: "600",
    boxShadow: "0 0 20px rgba(20, 184, 166, 0.25)",
  },

  secondaryBtn: {
    padding: "12px 20px",
    borderRadius: "14px",
    border: "1px solid rgba(148,163,184,0.3)",
    background: "transparent",
    color: "#cbd5e1",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "16px",

    background: "rgba(2, 6, 23, 0.7)",
    border: "1px solid rgba(45, 212, 191, 0.15)",

    color: "#e2e8f0",
  },

  tag: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "12px",

    background: "rgba(45, 212, 191, 0.08)",
    border: "1px solid rgba(45, 212, 191, 0.2)",

    textAlign: "center",
    fontWeight: "600",
  },
};
