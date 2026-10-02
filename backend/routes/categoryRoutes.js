const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");
const categoryValidator = require("../validators/categoryValidator");
const validate = require("../middleware/validate");
const router = express.Router();
router.get("/", getCategories);
router.post("/", protect, categoryValidator, validate, createCategory);
router.delete("/:id", protect, deleteCategory);
module.exports = router;
