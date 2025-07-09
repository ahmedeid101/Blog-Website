const PostValidator = require("../Validations/post.validators");
const Post = require("../Models/Post");
const PostRepository = require("../Repositories/post.repository");
const PostService = require("../Services/post.service");
const PostController = require("../Controllers/post.controller");

// Setup validator 
const postValidator = new PostValidator();

// Initialize dependencies
const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);
const postController = new PostController(postService, postValidator);

module.exports = {
  createPost: postController.createPost,
  getPost: postController.getPost,
  getAllPosts: postController.getAllPosts,
  updatePost: postController.updatePost,
  deletePost: postController.deletePost,
  likePost: postController.likePost,
  unlikePost: postController.unlikePost
};