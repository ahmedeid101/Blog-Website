const asyncHandler = require("express-async-handler");

class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  createCategory = asyncHandler(async (req, res) => {
    const category = await this.categoryService.createCategory({
        title: req.body.title,
        user: req.user._id
    });
    res.status(201).json({ success: true, data: category });
  });

  getAllCategories = asyncHandler(async (req, res) => {
    const categories = await this.categoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  });

  getCategoryById = asyncHandler(async (req, res) => {
    const category = await this.categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: "Category not found" });
    res.status(200).json({ success: true, data: category });
  });

  updateCategory = asyncHandler(async (req, res) => {
    const updated = await this.categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  });

  deleteCategory = asyncHandler(async (req, res) => {
    await this.categoryService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  });
}

module.exports = CategoryController;