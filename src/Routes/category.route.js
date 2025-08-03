const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../DependencyInjection/CategoryInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const validateObjectId = require("../Middlewares/validateObjectId");
const CategoryValidator = require("../Validations/category.validator");

const router = express.Router();

router.post("/", authMiddleware(['admin']), CategoryValidator.validateCreateCategory, createCategory);
router.get("/", getAllCategories);
router.get("/:id", validateObjectId, getCategoryById);
router.put("/:id", authMiddleware(['admin']), validateObjectId, updateCategory);
router.delete("/:id", authMiddleware(['admin']), validateObjectId, deleteCategory);

module.exports = router;