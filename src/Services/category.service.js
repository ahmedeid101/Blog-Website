class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(data) {
    return this.categoryRepository.create(data);
  }

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id) {
    return this.categoryRepository.findById(id);
  }

  async updateCategory(id, data) {
    return this.categoryRepository.update(id, data);
  }

  async deleteCategory(id) {
    return this.categoryRepository.delete(id);
  }
}

module.exports = CategoryService;