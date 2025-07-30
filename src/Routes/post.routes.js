const express = require("express");
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  updatePostImage,
  deletePost,
  toggleLikePost
} = require("../DependencyInjection/PostInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const PostValidator = require("../Validations/post.validators");
const validateObjectId = require("../Middlewares/validateObjectId");
const uploadPhoto = require('../Middlewares/photoUpload');

const router = express.Router();

// Routes
router.post('/create', authMiddleware(), uploadPhoto, PostValidator.validateCreatePost, createPost);
router.get("/", authMiddleware(['admin', 'user']), getAllPosts);
router.get("/:id", authMiddleware(), validateObjectId, getPost);
router.put("/:id", authMiddleware(), validateObjectId, uploadPhoto, PostValidator.validateUpdatePost, updatePost);
router.put("/upload-image/:id", authMiddleware(), uploadPhoto, validateObjectId, PostValidator.validateUpdatePost, updatePostImage);
router.delete("/:id", authMiddleware(['admin', 'user']), validateObjectId, deletePost);
router.put("/like/:id", authMiddleware(), validateObjectId, toggleLikePost);

module.exports = router;






// const express = require("express");
// const {
//   createPost,
//   getPost,
//   getAllPosts,
//   updatePost,
//   deletePost,
//   likePost,
//   unlikePost
// } = require("../DependencyInjection/PostInjection");
// const authMiddleware = require("../Middlewares/authMiddleware");
// const validateObjectId = require("../Middlewares/validateObjectId");
// const uploadPhoto = require('../Middlewares/photoUpload');

// const router = express.Router();

// // Protected routes
// router.use(authMiddleware());

// router.post('/create', uploadPhoto, createPost);
// router.get("/", getAllPosts);
// router.get("/:id", validateObjectId, getPost);
// router.put("/:id",  uploadPhoto, validateObjectId, updatePost);
// router.delete("/:id", validateObjectId, deletePost);
// router.put("/:id/like", validateObjectId, likePost);
// router.put("/:id/unlike", validateObjectId, unlikePost);

// module.exports = router;