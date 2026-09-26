const express = require("express");

const {
  askQuestion,
  generateFAQQuestion,
} = require("../controllers/aiController");

const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Ask AI Question
router.post("/ask", askQuestion);

// Generate FAQ using Gemini AI
// Only Admin and Creator can generate FAQs
router.post(
  "/generate-faq",
  authMiddleware,
  authorizeRoles("admin", "creator"),
  generateFAQQuestion
);

module.exports = router;