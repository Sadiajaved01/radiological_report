import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      setEmail("");
      setPassword("");

      navigate("/dashboard");
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

        <p style={styles.subtitle}>Radiological Report Classification System</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div style={styles.divider}></div>

        <p style={styles.footerText}>
          Don't have an account?
          <Link to="/signup" style={styles.link}>
            {" "}
            Create Account
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
    color: "#0f172a",
    marginBottom: "10px",
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
    textDecoration: "none",
    fontWeight: "600",
  },
};
