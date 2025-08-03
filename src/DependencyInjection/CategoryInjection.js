const Category = require("../Models/Category");
const CategoryRepository = require("../Repositories/category.repository");
const CategoryService = require("../Services/category.service");
const CategoryController = require("../Controllers/category.controller");

const categoryRepository = new CategoryRepository(Category);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

module.exports = {
  createCategory: categoryController.createCategory,
  getAllCategories: categoryController.getAllCategories,
  getCategoryById: categoryController.getCategoryById,
  updateCategory: categoryController.updateCategory,
  deleteCategory: categoryController.deleteCategory
};