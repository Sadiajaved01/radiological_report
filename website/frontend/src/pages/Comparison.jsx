import { useNavigate } from "react-router-dom";

export default function Comparison() {
  const navigate = useNavigate();

  const models = [
    ["ClinicalBERT", "97.73", "77.78", "Transformer"],
    ["RoBERTa", "96.32", "60.61", "Transformer"],
    ["BioBERT", "94.05", "36.36", "Transformer"],
    ["BiLSTM", "90.50", "32.00", "Deep Learning"],
    ["CNN", "89.25", "26.00", "Deep Learning"],
    ["Random Forest", "81.64", "26.98", "Machine Learning"],
    ["SVM", "80.24", "26.67", "Machine Learning"],
    ["Decision Tree", "77.45", "17.52", "Machine Learning"],
    ["LSTM", "50.00", "8.00", "Deep Learning"],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      <button onClick={() => navigate("/dashboard")} style={backBtn}>
        ← Dashboard
      </button>

      <h1
        style={{
          marginTop: "20px",
          color: "#0f172a",
        }}
      >
        Model Comparison
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Performance comparison of all trained models
      </p>

      {/* Winner Card */}

      <div
        style={{
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "white",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
        }}
      >
        <h2>🏆 Best Performing Model</h2>

        <h1
          style={{
            marginTop: "10px",
          }}
        >
          ClinicalBERT
        </h1>

        <p
          style={{
            fontSize: "18px",
          }}
        >
          Accuracy: 97.73% | F1 Score: 77.78%
        </p>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={statCard}>
          <h3>Total Models</h3>
          <h1 style={{ color: "#2563eb" }}>9</h1>
        </div>

        <div style={statCard}>
          <h3>Best Accuracy</h3>
          <h1 style={{ color: "#16a34a" }}>97.73%</h1>
        </div>

        <div style={statCard}>
          <h3>Deployment Model</h3>
          <h2 style={{ color: "#7c3aed" }}>ClinicalBERT</h2>
        </div>
      </div>

      {/* Table */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1e293b",
                color: "white",
              }}
            >
              <th style={th}>Rank</th>
              <th style={th}>Model</th>
              <th style={th}>Category</th>
              <th style={th}>Accuracy</th>
              <th style={th}>F1 Score</th>
            </tr>
          </thead>

          <tbody>
            {models.map((model, index) => (
              <tr
                key={model[0]}
                style={{
                  background: index === 0 ? "#eff6ff" : "white",
                }}
              >
                <td style={td}>
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : index + 1}
                </td>

                <td
                  style={{
                    ...td,
                    fontWeight: index === 0 ? "700" : "500",
                  }}
                >
                  {model[0]}
                </td>

                <td style={td}>{model[3]}</td>

                <td style={td}>{model[1]}%</td>

                <td style={td}>{model[2]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conclusion */}

      <div
        style={{
          background: "white",
          marginTop: "30px",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        }}
      >
        <h2>Conclusion</h2>

        <p
          style={{
            lineHeight: "1.8",
            color: "#475569",
          }}
        >
          ClinicalBERT achieved the highest classification performance among all
          evaluated Machine Learning, Deep Learning, and Transformer models.
          Therefore, it was selected as the final deployment model for the
          Radiological Report Classification System.
        </p>
      </div>
    </div>
  );
}

const statCard = {
  background: "white",
  borderRadius: "18px",
  padding: "25px",
  textAlign: "center",
  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
};

const th = {
  padding: "16px",
};

const td = {
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
  textAlign: "center",
};

const backBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};
