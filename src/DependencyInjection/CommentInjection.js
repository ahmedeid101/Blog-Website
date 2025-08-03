const Comment = require("../Models/Comment");
const CommentRepository = require("../Repositories/comment.repository");
const CommentService = require("../Services/comment.service");
const CommentController = require("../Controllers/comment.controller");

// Setup dependencies
const commentRepository = new CommentRepository(Comment);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

module.exports = {
  createComment: commentController.createComment,
  getAllComments: commentController.getAllComments,
  getCommentById: commentController.getCommentById,
  updateComment: commentController.updateComment,
  deleteComment: commentController.deleteComment
};