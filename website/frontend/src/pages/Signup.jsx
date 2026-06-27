import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      name: "",
      email: "",
      password: "",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signupUser(form);

      alert("Account created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>ClinicalBERT AI</h1>

        <h2 style={styles.heading}>Create Account</h2>

        <p style={styles.subtitle}>
          Register to access the Radiological Classification Dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="off"
            style={styles.input}
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            autoComplete="off"
            style={styles.input}
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            style={styles.input}
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={styles.divider}></div>

        <p style={styles.footerText}>
          Already have an account?
          <Link to="/login" style={styles.link}>
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  logo: {
    color: "#2563eb",
    marginBottom: "10px",
    fontSize: "32px",
    fontWeight: "700",
  },

  heading: {
    marginBottom: "10px",
    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "25px",
    lineHeight: "1.6",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "5px",
  },

  divider: {
    height: "1px",
    background: "#e2e8f0",
    marginTop: "25px",
    marginBottom: "20px",
  },

  footerText: {
    color: "#64748b",
  },

  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },
};
