const ErrorResponse = require("../Utils/errorResponse");
class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData) {
    // 1. Check for duplicate
    const { title, user, category } = postData;
    const existingPost = await this.postRepository.findByTitleAndUser(title, user);
    if (existingPost) {
      throw new ErrorResponse("You already created a post with this title", 400);
    }
    return this.postRepository.create(postData);
  }

  async getPostById(id) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new ErrorResponse("Post not found", 404);
    return post;
  }

  async getAllPosts(filter = {}) {
    return this.postRepository.findAll(filter);
  }

  async updatePost(id) {
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
