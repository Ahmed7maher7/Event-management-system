const Category = require("../models/Category");

const getCategories = async (req, res, next) => {
  try {
    res.json({
      success: true,
      categories: await Category.find().sort({ name: 1 }),
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const exists = await Category.findOne({ name: req.body.name });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Category already exists" });
    const category = await Category.create({ name: req.body.name });
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const Event = require("../models/Event");
    const used = await Event.exists({ category: req.params.id });
    if (used)
      return res
        .status(400)
        .json({ success: false, message: "Category is used by an event" });
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory, deleteCategory };
