import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendMessage } from "../services/api";

export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendMessage(form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* BACK BUTTON */}
        <button onClick={() => navigate("/dashboard")} style={styles.fab}>
          ← Back
        </button>

        <div style={styles.card}>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>
            Send feedback about ClinicalBERT AI system
          </p>

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <textarea
              style={styles.textarea}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button style={styles.button}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p style={styles.success}>✅ Message sent successfully</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
  },

  title: {
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  success: {
    marginTop: "10px",
    color: "#22c55e",
    textAlign: "center",
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
  },
};
