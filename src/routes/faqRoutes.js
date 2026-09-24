const express = require("express");

const router = express.Router();

const {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  searchFAQ,
} = require("../controllers/faqController");

const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get("/", getAllFAQs);

router.get("/search", searchFAQ);

router.get("/:id", getFAQById);

// Create FAQ
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "creator"),
  createFAQ
);

// Update FAQ
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "creator"),
  updateFAQ
);

// Delete FAQ
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteFAQ
);

module.exports = router;