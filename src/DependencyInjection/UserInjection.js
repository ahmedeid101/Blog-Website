const User = require('../Models/User');
const Post = require("../Models/Post");
const Comment = require("../Models/Comment");

const UserRepository = require('../Repositories/user.repository');
const PostRepository = require("../Repositories/post.repository");
const CommentRepository = require("../Repositories/comment.repository");

const UserService = require('../Services/user.service');
const UserController = require('../Controllers/user.controller');
const UpdateProfileValidator = require('../Validations/user.validators');
const EmailValidator = require('../Validations/email.validator');
const UsernameValidator = require('../Validations/username.validator');

// Setup dependencies
const userRepository = new UserRepository(User);
const postRepository = new PostRepository(Post);
const commentRepository = new CommentRepository(Comment);
const userService = new UserService(userRepository, postRepository, commentRepository);

// Setup validator chain
const validatorChain = new UpdateProfileValidator();
validatorChain.setNext(new EmailValidator())
.setNext(new UsernameValidator());

// Create controller
const userController = new UserController(userService, validatorChain);

module.exports = {
  getProfile: userController.getProfile,
  updateProfile: userController.updateProfile,
  deleteUserProfile: userController.deleteUserProfile,
  uploadProfilePhoto: userController.uploadProfilePhoto,
  getAllUsers: userController.getAllUsers,
  getAnyProfile: userController.getAnyProfile,
  deleteAnyProfile: userController.deleteAnyProfile,
  getTotalUsers: userController.getTotalUsers
};
