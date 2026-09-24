const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const router = express.Router();

console.log("AUTH ROUTES LOADED");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;