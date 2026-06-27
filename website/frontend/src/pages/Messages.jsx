import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <h1 style={{ color: "#2563eb" }}>Contact Messages</h1>

        <div style={styles.container}>
          {messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={styles.card}>
                <h3>{msg.name}</h3>
                <p>
                  <b>Email:</b> {msg.email}
                </p>
                <p>{msg.message}</p>
                <small>{msg.created_at}</small>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
  },

  container: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
};
