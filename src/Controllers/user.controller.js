const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

class UserController {
  constructor(userService, updateProfileValidator) {
    this.userService = userService;
    this.updateProfileValidator = updateProfileValidator;
  }

    getProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.getProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  });

  updateProfile = asyncHandler(async (req, res) => {
  const validated = await this.updateProfileValidator.validate(req.body);
  if (!validated.isValid) {
    return res.status(400).json({ 
      success: false,  // ← Consistent with your response format
      errors: validated.errors 
    });
  }
  try {
    const updatedUser = await this.userService.updateProfile(
      req.user.id,  // From auth middleware
      req.body      // Update data
    );

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
  });

  deleteProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.getProfile(req.user.id);
      if (!user) {
        res.status(404).json({message: 'user not found'})
      }
    //delete photo
    await this.userService.deleteProfilePhoto(user.profilePhoto.publicId);
    await this.userService.deleteProfile(req.user.id);
    res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });

    uploadProfilePhoto = asyncHandler(async (req, res) => {
      try {
      // Debug: Log the uploaded file
      console.log('Uploaded file:', {
        originalname: req.file?.originalname,
        mimetype: req.file?.mimetype,
        size: req.file?.size
      });

      if (!req.file) throw new Error('No file uploaded or Multer failed to process it');

      // Delete old photo if exists
      const user = await this.userService.getProfile(req.user.id);
      if (user.profilePhoto?.publicId) {
        await this.userService.deleteProfilePhoto(user.profilePhoto.publicId);
      }

      // Upload new photo
      const updatedUser = await this.userService.uploadProfilePhoto(
        req.user.id,
        req.file
      );

      res.status(200).json({
        success: true,
        data: updatedUser
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await this.userService.getAllProfiles();
    res.status(200).json({
      success: true,
      data: users,
    });
  });

    getAnyProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.getProfile(req.params.id);
    res.status(200).json({
      success: true,
      data: user
    });
  });

  deleteAnyProfile = asyncHandler(async (req, res) => {
      const user = await this.userService.getProfile(req.params.id);
      if (!user) {
        res.status(404).json({message: 'user not found'})
      }
    //delete photo
    await this.userService.deleteProfilePhoto(user.profilePhoto.publicId);
    await this.userService.deleteProfile(req.params.id);
    res.status(201).json({
      success: true,
      message: "Admin Delete User Successfully",
    });
  });

  getTotalUsers = asyncHandler(async(req, res) => {
    try {
      const count = await this.userService.getTotalUsers(req.query.role);
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to count users"
      });
    }
  });
}

module.exports = UserController;
