const { body } = require("express-validator");

const eventValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
  body("category").isMongoId().withMessage("Valid category is required"),
];

module.exports = eventValidator;
