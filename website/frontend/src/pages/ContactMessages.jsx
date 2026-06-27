import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={container}>
        <h1 style={{ color: "#2563eb", marginBottom: "20px" }}>
          Contact Messages (Admin Panel)
        </h1>

        <div style={tableContainer}>
          <table style={table}>
            <thead>
              <tr style={{ background: "#2563eb", color: "white" }}>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Message</th>
                <th style={th}>Status</th>
                <th style={th}>Date</th>
              </tr>
            </thead>

            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="6" style={empty}>
                    No messages found
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id}>
                    <td style={td}>{msg.id}</td>
                    <td style={td}>{msg.name}</td>
                    <td style={td}>{msg.email}</td>
                    <td style={td}>{msg.message}</td>
                    <td style={td}>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "8px",
                          background:
                            msg.status === "unread" ? "#facc15" : "#22c55e",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td style={td}>{msg.created_at}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* Styles */

const container = {
  padding: "40px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const tableContainer = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "12px",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};

const empty = {
  padding: "20px",
  textAlign: "center",
};
