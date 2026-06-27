import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={container}>
        {/* BACK BUTTON */}
        <button onClick={() => navigate("/dashboard")} style={backBtn}>
          ← Back to Dashboard
        </button>

        <h1 style={{ color: "#2563eb" }}>Project Profile</h1>

        <div style={card}>
          <h2>Final Year Project</h2>

          <p>
            <strong>Project Title:</strong>
            <br />
            Radiological Report Classification Using Transfer Learning
          </p>

          <p>
            <strong>Degree Program:</strong>
            <br />
            BS Computer Science
          </p>

          <p>
            <strong>Project Type:</strong>
            <br />
            Final Year Project (FYP)
          </p>
        </div>

        <div style={card}>
          <h2>Dataset</h2>

          <p>
            3060 Radiology Reports • Binary Classification (Normal / Abnormal)
          </p>
        </div>

        <div style={card}>
          <h2>Models Used</h2>

          <ul>
            <li>ClinicalBERT</li>
            <li>RoBERTa</li>
            <li>BioBERT</li>
            <li>BiLSTM</li>
            <li>LSTM</li>
            <li>CNN</li>
            <li>SVM</li>
            <li>Random Forest</li>
            <li>Decision Tree</li>
          </ul>
        </div>

        <div style={card}>
          <h2>Best Model</h2>

          <h1 style={{ color: "green" }}>ClinicalBERT</h1>

          <p>Accuracy: 97.73%</p>
          <p>Precision: 87.50%</p>
          <p>Recall: 70.00%</p>
          <p>F1 Score: 77.78%</p>
        </div>

        <Footer />
      </div>
    </>
  );
}

const container = {
  padding: "40px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const card = {
  background: "white",
  padding: "25px",
  marginTop: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const backBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "20px",
};
