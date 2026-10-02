const express = require("express");
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require("../controllers/eventController");
const protect = require("../middleware/authMiddleware");
const eventValidator = require("../validators/eventValidator");
const validate = require("../middleware/validate");
const router = express.Router();
router.get("/", getEvents);
router.get("/mine", protect, getMyEvents);
router.get("/:id", getEvent);
router.post("/", protect, eventValidator, validate, createEvent);
router.put("/:id", protect, eventValidator, validate, updateEvent);
router.delete("/:id", protect, deleteEvent);
module.exports = router;
