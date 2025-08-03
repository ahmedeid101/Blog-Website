const express = require("express");
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../DependencyInjection/CommentInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const CommentValidator = require("../Validations/comment.validator");
const validateObjectId = require("../Middlewares/validateObjectId");

const router = express.Router();

router.post(
  "/",
  authMiddleware(),
  CommentValidator.validateCreateComment,
  createComment
);
// Admin-only: Get all comments
router.get("/", authMiddleware(["admin"]), getAllComments);
router.get("/:id", authMiddleware(), validateObjectId, getCommentById);
// Update a comment (only owner or admin)
router.put(
  "/:id",
  authMiddleware(),
  validateObjectId,
  CommentValidator.validateUpdateComment,
  updateComment
);
router.delete("/:id", authMiddleware(), deleteComment);

module.exports = router;
