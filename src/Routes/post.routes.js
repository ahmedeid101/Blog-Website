const express = require("express");
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost
} = require("../DependencyInjection/PostInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const validateObjectId = require("../Middlewares/validateObjectId");
const uploadPhoto = require('../Middlewares/photoUpload');

const router = express.Router();

// Protected routes
router.use(authMiddleware());

router.post('/create', uploadPhoto, createPost);
router.get("/", getAllPosts);
router.get("/:id", validateObjectId, getPost);
router.put("/:id", validateObjectId, updatePost);
router.delete("/:id", validateObjectId, deletePost);
router.put("/:id/like", validateObjectId, likePost);
router.put("/:id/unlike", validateObjectId, unlikePost);

module.exports = router;