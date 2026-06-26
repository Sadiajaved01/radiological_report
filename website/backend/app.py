from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import re
import threading
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

from database import (
    init_db,
    create_user,
    login_user,
    save_prediction,
    get_predictions
)

app = Flask(__name__)

# ✅ CORS FIX
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

init_db()

lock = threading.Lock()

# =========================
# MODEL LOAD (REAL AI)
# =========================
MODEL_PATH = r"C:\Users\PMLS\Desktop\radiological_report\models\tl\clinicalbert\checkpoint-260"

tokenizer = AutoTokenizer.from_pretrained(
    "emilyalsentzer/Bio_ClinicalBERT",
    use_fast=False
)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_PATH,
    local_files_only=True,
    ignore_mismatched_sizes=True
)

device = torch.device("cpu")
model.to(device)
model.eval()

LABELS = {0: "Normal", 1: "Abnormal"}

# =========================
# EMAIL CHECK
# =========================
def is_valid_email(email):
    return re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email)

# =========================
# HOME
# =========================
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok"})

# =========================
# SIGNUP
# =========================
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        name = data.get("name", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "").strip()

        create_user(name, email, password)

        return jsonify({"success": True, "message": "Account created"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# =========================
# LOGIN
# =========================
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data.get("email", "").strip().lower()
        password = data.get("password", "").strip()

        user = login_user(email, password)

        if user:
            return jsonify({
                "success": True,
                "user": {"id": user[0], "name": user[1], "email": user[2]}
            })

        return jsonify({"success": False, "error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# =========================
# TEXT PREDICTION (REAL)
# =========================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        report = data.get("report", "")

        if not report.strip():
            return jsonify({"error": "Empty report"}), 400

        inputs = tokenizer(
            report,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=256
        ).to(device)

        with torch.no_grad():
            outputs = model(**inputs)

        probs = torch.softmax(outputs.logits, dim=1)

        pred = torch.argmax(probs, dim=1).item()
        confidence = float(probs[0][pred].item() * 100)

        prediction = LABELS[pred]

        save_prediction(prediction, round(confidence, 2), "ClinicalBERT", len(report), "text")

        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "model": "ClinicalBERT"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =========================
# PDF PREDICTION (REAL)
# =========================
@app.route("/predict-pdf", methods=["POST"])
def predict_pdf():
    try:
        from PyPDF2 import PdfReader

        file = request.files["file"]

        reader = PdfReader(file)
        text = ""

        for page in reader.pages:
            t = page.extract_text()
            if t:
                text += t

        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=256
        ).to(device)

        with torch.no_grad():
            outputs = model(**inputs)

        probs = torch.softmax(outputs.logits, dim=1)

        pred = torch.argmax(probs, dim=1).item()
        confidence = float(probs[0][pred].item() * 100)

        prediction = LABELS[pred]

        save_prediction(prediction, round(confidence, 2), "ClinicalBERT", len(text), "pdf")

        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence, 2),
            "model": "ClinicalBERT"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =========================
# CONTACT
# =========================
@app.route("/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()

        name = data.get("name", "")
        email = data.get("email", "")
        message = data.get("message", "")

        with lock:
            conn = sqlite3.connect("predictions.db")
            cur = conn.cursor()

            cur.execute("""
                INSERT INTO contact_messages (name, email, message)
                VALUES (?, ?, ?)
            """, (name, email, message))

            conn.commit()
            conn.close()

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =========================
# HISTORY
# =========================
@app.route("/history", methods=["GET"])
def history():
    try:
        rows = get_predictions()

        return jsonify([
            {
                "id": r[0],
                "prediction": r[1],
                "confidence": r[2],
                "model": r[3],
                "report_length": r[4],
                "input_type": r[5],
                "created_at": r[6]
            }
            for r in rows
        ])

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =========================
# MESSAGES
# =========================
@app.route("/messages", methods=["GET"])
def messages():
    conn = sqlite3.connect("predictions.db")
    cur = conn.cursor()

    cur.execute("SELECT * FROM contact_messages ORDER BY id DESC")
    rows = cur.fetchall()

    conn.close()

    return jsonify(rows)

# =========================
# RUN
# =========================
if __name__ == "__main__":
    app.run(debug=True, threaded=True)