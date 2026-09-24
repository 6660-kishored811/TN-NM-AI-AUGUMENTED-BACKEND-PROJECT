const express = require("express");

const { askQuestion } = require("../controllers/aiController");

const router = express.Router();

// Ask AI FAQ Assistant
router.post("/ask", askQuestion);

module.exports = router;