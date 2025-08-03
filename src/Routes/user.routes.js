const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteUserProfile,
  uploadProfilePhoto,
  deleteAnyProfile,
  getAllUsers,
  getAnyProfile,
  getTotalUsers,
} = require("../DependencyInjection/UserInjection");
const authMiddleware = require("../Middlewares/authMiddleware");
const validateObjectId = require("../Middlewares/validateObjectId");
const uploadPhoto = require('../Middlewares/photoUpload');


const router = express.Router();

// Protected routes
router.use(authMiddleware());

// User routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/profile/:id", deleteUserProfile);
router.post('/profile/upload-photo', uploadPhoto, uploadProfilePhoto);

// Admin-only routes
router.get("/all", authMiddleware(["admin"]), getAllUsers);
router.get("/user/:id", validateObjectId, authMiddleware(["admin"]), getAnyProfile);
router.get("/count", authMiddleware(["admin"]), getTotalUsers);
router.delete("/user/:id", validateObjectId, authMiddleware(["admin"]), deleteAnyProfile);

module.exports = router;
