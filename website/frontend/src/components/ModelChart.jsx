import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ModelChart() {
  const data = [
    { model: "ClinicalBERT", accuracy: 97.73 },
    { model: "RoBERTa", accuracy: 96.32 },
    { model: "BioBERT", accuracy: 94.05 },
    { model: "BiLSTM", accuracy: 90.5 },
    { model: "CNN", accuracy: 89.25 },
    { model: "RF", accuracy: 81.64 },
    { model: "SVM", accuracy: 80.24 },
    { model: "DT", accuracy: 77.45 },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2>Model Accuracy Comparison</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="model" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="accuracy" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
