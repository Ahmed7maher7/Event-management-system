const express = require("express");
const {
  registerForEvent,
  cancelRegistration,
  getEventRegistrations,
  getMyRegistrations,
} = require("../controllers/registrationController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/mine", protect, getMyRegistrations);
router.post("/events/:id", protect, registerForEvent);
router.delete("/events/:id", protect, cancelRegistration);
router.get("/events/:id", protect, getEventRegistrations);
module.exports = router;
