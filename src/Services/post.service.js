const ErrorResponse = require("../Utils/errorResponse");
class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData) {
    // 1. Check for duplicate
    const { title, user, category } = postData;
    const existingPost = await this.postRepository.findByTitleAndUser(
      title,
      user
    );
    if (existingPost) {
      throw new ErrorResponse(
        "You already created a post with this title",
        400
      );
    }
    return this.postRepository.create(postData);
  }

  async getPostById(id, user) {
  const post = await this.postRepository.findById(id);
  if (!post) throw new ErrorResponse("Post not found", 404);

  if (user.role !== "admin" && post.user._id.toString() !== user._id.toString()) {
    throw new ErrorResponse("Not authorized to view this post", 403);
  }

  return post;
}

  // async getPostById(id) {
  //   const post = await this.postRepository.findById(id);
  //   if (!post) throw new ErrorResponse("Post not found", 404);
  //   return post;
  // }

// async getAllPosts(filter = {}, skip = 0, limit = 10) {
//   return this.postRepository.findAll(filter, skip, limit);
// }

async getAllPosts(user, query) {
  const { category, page = 1 } = query;
  const POST_PER_PAGE = 5;
  const skip = (page - 1) * POST_PER_PAGE;

  const filter = {};
  if (category) filter.category = category;

  // If not admin, filter only their own posts
  if (user.role !== "admin") {
    filter.user = user._id;
  }

  return this.postRepository.findAll(filter, skip, POST_PER_PAGE);
}

  async countPosts(filter = {}) {
    return this.postRepository.count(filter);
  }

  async updatePost(id, updateData) {
    const post = await this.postRepository.update(id, updateData);
    if (!post) throw new ErrorResponse("Post not found", 404);
    return post;
  }

  async deletePost(id) {
    const post = await this.postRepository.delete(id);
    if (!post) {
      throw new ErrorResponse("Post not found", 404);
    }
    return post;
  }

  async likePost(postId, userId) {
    return this.postRepository.likePost(postId, userId);
  }

  async unlikePost(postId, userId) {
    return this.postRepository.unlikePost(postId, userId);
  }
}

module.exports = PostService;
