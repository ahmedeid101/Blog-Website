class PostRepository {
  constructor(model) {
    this.model = model;
  }
  async create(postData) {
    return this.model.create(postData);
  }

  async findById(id) {
    return this.model.findById(id).populate("user", "username profilePhoto");
  }

  async findAll(filter = {}, skip = 0, limit = 0) {
    const query = this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);

    if (limit > 0) {
      query.skip(skip).limit(limit);
    }

    return query;
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async findByTitleAndUser(title, userId) {
    return this.model.findOne({ title, user: userId });
  }

  async update(id, data, options = {}) {
    let query = this.model.findByIdAndUpdate(id, { $set: data }, { new: true });

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(
          field,
          field === "user" ? "-password" : undefined
        );
      });
    }

    return query;
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async updateLikes(id, data, options = {}) {
    let query = this.model.findByIdAndUpdate(id, data, { new: true });

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(
          field,
          field === "user" ? "-password" : "username"
        );
      });
    }

    return query;
  }
}

module.exports = PostRepository;
