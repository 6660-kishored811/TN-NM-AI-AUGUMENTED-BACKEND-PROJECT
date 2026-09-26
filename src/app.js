const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const faqRoutes = require("./routes/faqRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/ai", aiRoutes);

// Basic status check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI FAQ Assistant API is running.",
    version: "1.0.0",
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

module.exports = app;