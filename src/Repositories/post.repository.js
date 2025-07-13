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

  async update(id, updateData) {
    return this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async likePost(postId, userId) {
    return this.model.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
  }

  async likePost(postId, userId) {
    return this.model.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
  }
}

module.exports = PostRepository;
