import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Classify from "./pages/Classify";
import PdfUpload from "./pages/PDFUpload";
import Comparison from "./pages/Comparison";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";

/* =========================
   PRIVATE ROUTE FIXED
========================= */
function PrivateRoute({ children }) {
  const auth = localStorage.getItem("auth");

  // supports both "true" and token-based auth
  return auth ? children : <Navigate to="/login" replace />;
}

/* =========================
   MAIN APP ROUTER
========================= */
export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/classify"
        element={
          <PrivateRoute>
            <Classify />
          </PrivateRoute>
        }
      />

      <Route
        path="/pdf-upload"
        element={
          <PrivateRoute>
            <PdfUpload />
          </PrivateRoute>
        }
      />

      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        }
      />

      <Route
        path="/comparison"
        element={
          <PrivateRoute>
            <Comparison />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        }
      />

      {/* FALLBACK ROUTE */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
