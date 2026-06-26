import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PdfUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/predict-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setResult(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📄 Radiology PDF Scanner</h1>

        <p style={styles.subtitle}>Radiological AI Document Analysis System</p>

        {/* upload box */}
        <div style={styles.uploadBox}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={styles.input}
          />

          <p style={styles.hint}>Upload radiology report PDF for AI analysis</p>
        </div>

        {/* buttons */}
        <div style={styles.btnRow}>
          <button style={styles.primaryBtn} onClick={handleUpload}>
            {loading ? "Scanning..." : "Run AI Scan"}
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </div>

        {/* result */}
        {result && (
          <div style={styles.resultBox}>
            <h2
              style={{
                color: result.prediction === "Abnormal" ? "#ef4444" : "#22c55e",
              }}
            >
              {result.prediction}
            </h2>

            <p style={styles.text}>Confidence: {result.confidence}%</p>
            <p style={styles.text}>Model: {result.model}</p>

            <div style={styles.tag}>
              {result.prediction === "Abnormal"
                ? "⚠ Abnormal Report Detected"
                : "✅ Normal Report"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= FIXED CLEAN MEDICAL THEME ================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    /* LIGHT + PROFESSIONAL BACKGROUND */
    background: "linear-gradient(135deg, #e0f2fe, #f8fafc, #eef2ff)",

    padding: "30px",
    fontFamily: "Segoe UI",
  },

  card: {
    width: "100%",
    maxWidth: "650px",

    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",

    boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
    border: "1px solid #e2e8f0",
  },

  title: {
    color: "#1d4ed8",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "20px",
  },

  uploadBox: {
    border: "2px dashed #93c5fd",
    padding: "22px",
    borderRadius: "14px",
    textAlign: "center",
    background: "#f8fafc",
  },

  input: {
    width: "100%",
    color: "#0f172a",
  },

  hint: {
    marginTop: "10px",
    color: "#64748b",
    fontSize: "13px",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  primaryBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
    fontWeight: "600",
  },

  secondaryBtn: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#334155",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "12px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
  },

  text: {
    color: "#0f172a",
    marginTop: "5px",
  },

  tag: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "10px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontWeight: "600",
    textAlign: "center",
  },
};
