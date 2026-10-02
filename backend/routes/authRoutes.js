const express = require("express");
const { register, login, me } = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const validate = require("../middleware/validate");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", protect, me);
module.exports = router;
