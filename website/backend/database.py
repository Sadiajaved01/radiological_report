import sqlite3

DB_NAME = "predictions.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    # predictions
    cur.execute("""
    CREATE TABLE IF NOT EXISTS predictions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prediction TEXT,
        confidence REAL,
        model TEXT,
        report_length INTEGER,
        input_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # users
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    # contact messages
    cur.execute("""
    CREATE TABLE IF NOT EXISTS contact_messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()


def create_user(name, email, password):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO users(name,email,password)
        VALUES (?,?,?)
    """, (name, email, password))

    conn.commit()
    conn.close()


def login_user(email, password):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("""
        SELECT id,name,email FROM users
        WHERE email=? AND password=?
    """, (email, password))

    user = cur.fetchone()
    conn.close()
    return user


def save_prediction(prediction, confidence, model, report_length, input_type):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO predictions(prediction,confidence,model,report_length,input_type)
        VALUES (?,?,?,?,?)
    """, (prediction, confidence, model, report_length, input_type))

    conn.commit()
    conn.close()


def get_predictions():
    conn = sqlite3.connect("predictions.db")
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM predictions
        ORDER BY id DESC
    """)

    rows = cur.fetchall()
    conn.close()
    return rows