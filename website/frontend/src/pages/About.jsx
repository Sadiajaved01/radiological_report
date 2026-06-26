import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* FLOATING BACK BUTTON */}
        <button onClick={() => navigate("/dashboard")} style={styles.fab}>
          ← Back
        </button>

        <div style={styles.container}>
          <h1 style={styles.title}>About ClinicalBERT AI System</h1>
          <p style={styles.subtitle}>
            Intelligent Radiological Report Classification System
          </p>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h2>🎯 Project Objective</h2>
              <p>
                Build an AI system that classifies radiological reports into
                Normal and Abnormal using ClinicalBERT and ML models.
              </p>
            </div>

            <div style={styles.card}>
              <h2>⚠ Problem Statement</h2>
              <p>
                Manual radiology report analysis is slow and error-prone. This
                system automates diagnosis support for radiologists.
              </p>
            </div>

            <div style={styles.card}>
              <h2>💡 Importance</h2>
              <p>
                Improves diagnosis speed, reduces workload, and enhances patient
                care in hospitals.
              </p>
            </div>

            <div style={styles.card}>
              <h2>🧠 Research Contribution</h2>
              <ul>
                <li>ClinicalBERT fine-tuning</li>
                <li>Multi-model comparison</li>
                <li>Full-stack AI web system</li>
                <li>Real-time predictions</li>
              </ul>
            </div>

            <div style={styles.card}>
              <h2>🚀 Future Work</h2>
              <ul>
                <li>Multi-class disease detection</li>
                <li>Hospital integration (PACS)</li>
                <li>Cloud deployment (AWS/Azure)</li>
                <li>Explainable AI features</li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "white",
    padding: "40px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  title: {
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
  },

  fab: {
    position: "fixed",
    top: "20px",
    left: "20px",
    padding: "10px 16px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  },
};
