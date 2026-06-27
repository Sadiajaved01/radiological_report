import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state || {
    prediction: "Normal",
    confidence: 99.89,
    model: "ClinicalBERT",
  };

  const predictionColor =
    result.prediction === "Normal" ? "#16a34a" : "#dc2626";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px",
      }}
    >
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Back Dashboard
      </button>

      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          background: "white",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
          }}
        >
          Classification Result
        </h1>

        <hr />

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <h2>Prediction</h2>

          <h1
            style={{
              fontSize: "50px",
              color: predictionColor,
            }}
          >
            {result.prediction}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>Confidence</h3>
            <h2>{result.confidence}%</h2>
          </div>

          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>Model</h3>
            <h2>{result.model}</h2>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "#eff6ff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Clinical Interpretation</h3>

          <p>
            {result.prediction === "Normal"
              ? "The report is classified as Normal. No significant abnormal findings were detected."
              : "The report is classified as Abnormal. Further radiologist review is recommended."}
          </p>
        </div>

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => navigate("/classify")}
            style={{
              padding: "12px 25px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Analyze Another Report
          </button>

          <button
            onClick={() => window.print()}
            style={{
              padding: "12px 25px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Print Result
          </button>
        </div>
      </div>
    </div>
  );
}
