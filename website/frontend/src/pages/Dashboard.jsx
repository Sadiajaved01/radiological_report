import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelChart from "../components/ModelChart";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    normal: 0,
    abnormal: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login");
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/history");
      const data = await res.json();

      setStats({
        total: data.length,
        normal: data.filter((x) => x.prediction === "Normal").length,
        abnormal: data.filter((x) => x.prediction === "Abnormal").length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    { title: "Text Analysis", icon: "🧠", path: "/classify" },
    { title: "PDF Scan", icon: "📄", path: "/pdf-upload" },
    { title: "Patient History", icon: "📊", path: "/history" },
    { title: "AI Analytics", icon: "📈", path: "/analytics" },
    { title: "Model Lab", icon: "⚗️", path: "/comparison" },
    { title: "Project Info", icon: "🏥", path: "/about" },
  ];

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* HERO PANEL */}
        <div style={styles.hero}>
          <h1>🏥 Radiological AI Diagnostic System</h1>
          <p>Clinical Decision Support Dashboard</p>
        </div>

        {loading ? (
          <div style={styles.loading}>Initializing AI Engine...</div>
        ) : (
          <>
            {/* FLOATING KPI CARDS */}
            <div style={styles.kpiRow}>
              <div style={styles.kpi}>
                <span>Total Scans</span>
                <h2>{stats.total}</h2>
              </div>

              <div style={styles.kpi}>
                <span>Normal Cases</span>
                <h2 style={{ color: "#22c55e" }}>{stats.normal}</h2>
              </div>

              <div style={styles.kpi}>
                <span>Abnormal Cases</span>
                <h2 style={{ color: "#ef4444" }}>{stats.abnormal}</h2>
              </div>

              <div style={styles.kpi}>
                <span>AI Core</span>
                <h2 style={{ color: "#a855f7" }}>ClinicalBERT</h2>
              </div>
            </div>

            {/* MAIN GRID */}
            <div style={styles.grid}>
              {/* CHART PANEL */}
              <div style={styles.panelLarge}>
                <h3>📊 Diagnostic Intelligence Overview</h3>
                <ModelChart />
              </div>

              {/* MODULE PANEL */}
              <div style={styles.panelSmall}>
                <h3>⚙ AI Modules</h3>

                <div style={styles.modules}>
                  {modules.map((m, i) => (
                    <div
                      key={i}
                      style={styles.module}
                      onClick={() => navigate(m.path)}
                    >
                      <div style={{ fontSize: "22px" }}>{m.icon}</div>
                      <p>{m.title}</p>
                    </div>
                  ))}
                </div>

                <button
                  style={styles.logout}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Exit System
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

/* ================= UNIQUE MEDICAL UI STYLE ================= */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "35px",
    background: "radial-gradient(circle at top, #eef2ff, #f8fafc, #f1f5f9)",
    fontFamily: "Segoe UI",
  },

  hero: {
    textAlign: "center",
    marginBottom: "25px",
  },

  loading: {
    textAlign: "center",
    color: "#64748b",
  },

  /* KPI FLOATING CARDS */
  kpiRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "25px",
  },

  kpi: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    padding: "18px",
    borderRadius: "16px",
    minWidth: "180px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1px solid rgba(99,102,241,0.15)",
  },

  /* MAIN LAYOUT */
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },

  panelLarge: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },

  panelSmall: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },

  modules: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "15px",
  },

  module: {
    background: "#f8fafc",
    padding: "12px",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
    border: "1px solid #e2e8f0",
  },

  logout: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    cursor: "pointer",
  },
};
