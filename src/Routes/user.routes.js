const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteProfile,
  deleteAnyProfile,
  getAllUsers,
  getAnyProfile,
  getTotalUsers,
} = require("../DependencyInjection/User");
const authMiddleware = require("../Middlewares/authMiddleware");
const validateObjectId = require("../Middlewares/validateObjectId");

const router = express.Router();

// Protected routes
router.use(authMiddleware());

router.get("/getProfile", getProfile);
router.put("/updateProfile", updateProfile);
router.delete("/deleteProfile", deleteProfile);

// Admin-only routes
router.get("/getAllUsers", authMiddleware(["admin"]), getAllUsers);
router.get(
  "/getAnyProfile/:id",
  validateObjectId,
  authMiddleware(["admin"]),
  getAnyProfile
);
router.get("/countUsers", authMiddleware(["admin"]), getTotalUsers);
router.delete(
  "/deleteProfile/:id",
  validateObjectId,
  authMiddleware(["admin"]),
  deleteAnyProfile
);

module.exports = router;
