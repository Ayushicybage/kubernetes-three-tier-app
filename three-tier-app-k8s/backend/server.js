import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || "mysql",
  user: process.env.DATABASE_USER || "appuser",
  password: process.env.DATABASE_PASSWORD || "apppass",
  database: process.env.DATABASE_NAME || "mydb",
  port: process.env.DATABASE_PORT || 3306,
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Get all users
app.get("/api/users", async (req, res) => {  // <-- added /api prefix
  try {
    const [rows] = await pool.query("SELECT * FROM users ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add a new user
app.post("/api/users", async (req, res) => {  // <-- added /api prefix
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name) VALUES (?)",
      [name]
    );
    res.json({ id: result.insertId, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
