import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <h2 style={{ color: "white" }}>ClinicalBERT AI</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link style={styles.link} to="/">
          Home
        </Link>

        <Link style={styles.link} to="/dashboard">
          Dashboard
        </Link>

        <Link style={styles.link} to="/classify">
          Classify
        </Link>

        <Link style={styles.link} to="/pdf-upload">
          PDF Upload
        </Link>

        <Link style={styles.link} to="/analytics">
          Analytics
        </Link>

        <Link style={styles.link} to="/comparison">
          Comparison
        </Link>

        <Link style={styles.link} to="/history">
          History
        </Link>

        <Link style={styles.link} to="/profile">
          Profile
        </Link>

        <Link style={styles.link} to="/about">
          About
        </Link>

        <Link style={styles.link} to="/contact">
          Contact
        </Link>

        <button
          onClick={logout}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
};
