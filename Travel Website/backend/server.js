// Import required modules
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = 4000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON data in request body

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "saadiyah@123", // Your MySQL password
  database: "travel_website", // Your database name
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// API Endpoint for Booking (POST request)
app.post("/bookings", (req, res) => {
  const { name, email, phone, date, message } = req.body;

  // Validate the request body
  if (!name || !email || !date) {
    return res.status(400).json({ error: "Name, email, and date are required!" });
  }

  const sql = "INSERT INTO bookings (name, email, phone, date, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, date, message], (err, result) => {
    if (err) {
      console.error("Error inserting booking:", err);
      res.status(500).json({ error: "Failed to add booking." });
    } else {
      res.status(201).json({ message: "Booking added successfully!" });
    }
  });
});

// API Endpoint for Fetching Bookings (GET request)
app.get("/bookings", (req, res) => {
  const sql = "SELECT * FROM bookings";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).json({ error: "Failed to fetch bookings." });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
