import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const cardStyle = {
    background: "white",
    borderRadius: "15px",
    padding: "25px",
    width: "250px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "50px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Radiological AI Diagnostic System</h1>

          <p
            style={{
              maxWidth: "900px",
              margin: "20px auto",
              color: "#64748b",
              fontSize: "18px",
            }}
          >
            AI-powered Radiology Report Classification Platform
          </p>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "50px",
          }}
        >
          <div style={cardStyle} onClick={() => navigate("/classify")}>
            <h3>🧪 Test Analysis</h3>
            <p>Analyze Radiology Reports</p>
          </div>

          <div style={cardStyle} onClick={() => navigate("/pdf-upload")}>
            <h3>📄 PDF Upload</h3>
            <p>Classify PDF Reports</p>
          </div>

          <div style={cardStyle} onClick={() => navigate("/history")}>
            <h3>📚 History</h3>
            <p>View Previous Predictions</p>
          </div>

          <div style={cardStyle} onClick={() => navigate("/analytics")}>
            <h3>📊 Analytics</h3>
            <p>Performance Dashboard</p>
          </div>

          <div style={cardStyle} onClick={() => navigate("/comparison")}>
            <h3>🤖 Model Comparison</h3>
            <p>Compare All AI Models</p>
          </div>

          <div style={cardStyle} onClick={() => navigate("/profile")}>
            <h3>👤 Profile</h3>
            <p>Project Information</p>
          </div>
        </div>

        {/* Highlights */}
        <div
          style={{
            background: "white",
            marginTop: "60px",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            maxWidth: "1000px",
            marginInline: "auto",
          }}
        >
          <h2 style={{ color: "#2563eb" }}>Project Highlights</h2>

          <ul
            style={{
              lineHeight: "2",
              color: "#334155",
            }}
          >
            <li>9 AI Models Evaluated</li>
            <li>ClinicalBERT Accuracy: 97.73%</li>
            <li>Machine Learning + Deep Learning Models</li>
            <li>Transformer-Based ClinicalBERT Integration</li>
            <li>PDF Report Classification</li>
            <li>Prediction History Storage</li>
            <li>Analytics Dashboard</li>
            <li>Model Comparison Dashboard</li>
          </ul>
        </div>
      </div>
    </>
  );
}
