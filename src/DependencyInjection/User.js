const User = require('../Models/User');
const UserRepository = require('../Repositories/user.repository');
const UserService = require('../Services/user.service');
const UserController = require('../Controllers/user.controller');
const UpdateProfileValidator = require('../Validations/user.validators');
const EmailValidator = require('../Validations/email.validator');
const UsernameValidator = require('../Validations/username.validator');

// Setup dependencies
const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

// Setup validator chain
const validatorChain = new UpdateProfileValidator();
validatorChain.setNext(new EmailValidator())
.setNext(new UsernameValidator());

// Create controller
const userController = new UserController(userService, validatorChain);

module.exports = {
  getProfile: userController.getProfile,
  updateProfile: userController.updateProfile,
  deleteProfile: userController.deleteProfile,
  getAllUsers: userController.getAllUsers,
  getAnyProfile: userController.getAnyProfile,
  deleteAnyProfile: userController.deleteAnyProfile,
  getTotalUsers: userController.getTotalUsers
};
