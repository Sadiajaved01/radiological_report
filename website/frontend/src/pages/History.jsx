import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = history.filter((item) => {
    const searchMatch = item.prediction
      .toLowerCase()
      .includes(search.toLowerCase());

    const filterMatch = filter === "All" ? true : item.prediction === filter;

    return searchMatch && filterMatch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Prediction History
          </h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            ClinicalBERT Prediction Records
          </p>
        </div>

        <button onClick={() => navigate("/dashboard")} style={backButton}>
          Dashboard
        </button>
      </div>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <SummaryCard
          title="Total Records"
          value={history.length}
          color="#2563eb"
        />

        <SummaryCard
          title="Normal"
          value={history.filter((x) => x.prediction === "Normal").length}
          color="#16a34a"
        />

        <SummaryCard
          title="Abnormal"
          value={history.filter((x) => x.prediction === "Abnormal").length}
          color="#dc2626"
        />
      </div>

      {/* Filters */}

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "25px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search predictions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={filterBox}
        >
          <option>All</option>
          <option>Normal</option>
          <option>Abnormal</option>
        </select>
      </div>

      {/* Table */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
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
              <th style={th}>ID</th>
              <th style={th}>Prediction</th>
              <th style={th}>Confidence</th>
              <th style={th}>Input Type</th>
              <th style={th}>Model</th>
              <th style={th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                style={{
                  transition: "0.2s",
                }}
              >
                <td style={td}>{item.id}</td>

                <td style={td}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      background:
                        item.prediction === "Normal" ? "#16a34a" : "#dc2626",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {item.prediction}
                  </span>
                </td>

                <td style={td}>{Number(item.confidence).toFixed(2)}%</td>

                <td style={td}>{item.input_type}</td>

                <td style={td}>{item.model}</td>

                <td style={td}>{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h4
        style={{
          color: "#64748b",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h1
        style={{
          margin: 0,
          color,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

const searchBox = {
  flex: 1,
  minWidth: "250px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const filterBox = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const backButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
};

const th = {
  padding: "16px",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0",
};
