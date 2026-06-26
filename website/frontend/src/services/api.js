// 🔥 PUT YOUR BACKEND NGROK URL HERE (PORT 5000)
const BASE_URL = "https://batting-seismic-arrogance.ngrok-free.dev";

// =========================
// LOGIN USER
// =========================
export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

// =========================
// SIGNUP USER
// =========================
export async function signupUser(data) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Signup failed");
  }

  return result;
}

// =========================
// TEXT PREDICTION
// =========================
export async function predictReport(report) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ report }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Prediction failed");
  }

  return result;
}

// =========================
// PDF UPLOAD PREDICTION
// =========================
export async function uploadPDF(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/predict-pdf`, {
    method: "POST",
    body: form,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "PDF upload failed");
  }

  return result;
}

// =========================
// CONTACT MESSAGE
// =========================
export async function sendMessage(data) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Message failed");
  }

  return result;
}

// =========================
// HISTORY
// =========================
export async function getHistory() {
  const res = await fetch(`${BASE_URL}/history`);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch history");
  }

  return result;
}

// =========================
// MESSAGES
// =========================
export async function getMessages() {
  const res = await fetch(`${BASE_URL}/messages`);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch messages");
  }

  return result;
}
