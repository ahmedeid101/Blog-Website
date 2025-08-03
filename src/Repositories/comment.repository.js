class CommentRepository {
  constructor(model) {
    this.model = model;
  }

  // Create a new comment
  async create(data) {
    return await this.model.create(data);
  }

  // Get all comments with optional population
  async findAll(filter = {}, options = {}) {
    let query = this.model.find(filter);

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return query;
  }

  // Get comment by ID
  async findById(id, options = {}) {
    let query = this.model.findById(id);

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return query;
  }

  // Update comment by ID
  async update(id, data, options = {}) {
    let query = this.model.findByIdAndUpdate(id, { $set: data }, { new: true });

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return query;
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

    async deleteMany(filter) {
    return this.model.deleteMany(filter);
  }
}

module.exports = CommentRepository;
