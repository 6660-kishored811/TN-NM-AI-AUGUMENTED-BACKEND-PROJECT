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

module.exports = app;