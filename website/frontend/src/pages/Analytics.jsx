import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Analytics() {
  const navigate = useNavigate();

  const reportData = [
    {
      name: "Normal",
      value: 65,
    },
    {
      name: "Abnormal",
      value: 35,
    },
  ];

  const modelData = [
    { model: "ClinicalBERT", accuracy: 97.73 },
    { model: "RoBERTa", accuracy: 96.32 },
    { model: "BioBERT", accuracy: 94.05 },
    { model: "BiLSTM", accuracy: 90.5 },
    { model: "CNN", accuracy: 89.25 },
    { model: "RF", accuracy: 81.64 },
    { model: "SVM", accuracy: 80.24 },
    { model: "DT", accuracy: 77.45 },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#64748b",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ← Back to Dashboard
        </button>

        <h1
          style={{
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          Analytics Dashboard
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <div style={card}>
            <h3>Total Reports</h3>
            <h1 style={{ color: "#2563eb" }}>3060</h1>
          </div>

          <div style={card}>
            <h3>Best Model</h3>
            <h1 style={{ color: "#7c3aed" }}>ClinicalBERT</h1>
          </div>

          <div style={card}>
            <h3>Accuracy</h3>
            <h1 style={{ color: "#16a34a" }}>97.73%</h1>
          </div>

          <div style={card}>
            <h3>F1 Score</h3>
            <h1 style={{ color: "#dc2626" }}>77.78%</h1>
          </div>
        </div>

        <div style={chartCard}>
          <h2>Normal vs Abnormal Reports</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={reportData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {reportData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            ...chartCard,
            marginTop: "30px",
          }}
        >
          <h2>Model Accuracy Comparison</h2>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={modelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            ...chartCard,
            marginTop: "30px",
          }}
        >
          <h2>ClinicalBERT Evaluation Metrics</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#2563eb",
                  color: "white",
                }}
              >
                <th style={th}>Metric</th>
                <th style={th}>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={td}>Accuracy</td>
                <td style={td}>97.73%</td>
              </tr>

              <tr>
                <td style={td}>Precision</td>
                <td style={td}>87.50%</td>
              </tr>

              <tr>
                <td style={td}>Recall</td>
                <td style={td}>70.00%</td>
              </tr>

              <tr>
                <td style={td}>F1 Score</td>
                <td style={td}>77.78%</td>
              </tr>

              <tr>
                <td style={td}>ROC AUC</td>
                <td style={td}>96.20%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </>
  );
}

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  minWidth: "220px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const chartCard = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const th = {
  padding: "15px",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};
