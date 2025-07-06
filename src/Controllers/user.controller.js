const asyncHandler = require("express-async-handler");

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
    await this.userService.deleteProfile(req.user.id);
    res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
    });
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
