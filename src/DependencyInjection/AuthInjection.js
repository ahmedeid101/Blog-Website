const User = require('../Models/User');
const AuthRepository = require('../Repositories/auth.repository');
const BcryptStrategy = require('../Strategies/bcrypt.strategy');
const AuthService = require('../Services/auth.service');
const AuthController = require('../Controllers/Auth.Controller');
const EmailValidator = require('../Validations/email.validator');
const UsernameValidator = require('../Validations/username.validator');
const RegisterValidator = require('../Validations/register.validator');
const LoginValidator = require('../Validations/login.validator');
const JWT = require('../Utils/jwt');



// Initialize JWT service
const jwtService = new JWT(); 

// Setup dependencies
const authRepository = new AuthRepository(User);
const passwordStrategy = new BcryptStrategy();
const authService = new AuthService(authRepository, passwordStrategy, jwtService);



// Setup validator chain
const validatorChain = new EmailValidator();
validatorChain.setNext(new RegisterValidator())
.setNext(new UsernameValidator());

const loginValidator = new LoginValidator();


// Create controller
const authController = new AuthController(authService, validatorChain, loginValidator );

module.exports = {
  register: authController.register,
  login: authController.login
};
