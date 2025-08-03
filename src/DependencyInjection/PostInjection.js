const Post = require("../Models/Post");
const PostRepository = require("../Repositories/post.repository");
const PostService = require("../Services/post.service");
const PostController = require("../Controllers/post.controller");

// Initialize dependencies
const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

module.exports = {
  createPost: postController.createPost,
  getPost: postController.getPost,
  getAllPosts: postController.getAllPosts,
  updatePost: postController.updatePost,
  updatePostImage: postController.updatePostImage,
  deletePost: postController.deletePost,
  toggleLikePost: postController.toggleLikePost
};