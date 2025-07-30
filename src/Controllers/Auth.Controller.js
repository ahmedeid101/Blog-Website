const asyncHandler = require("express-async-handler");

class AuthController {
  constructor(authService, validatorChain, loginValidator) {
    this.authService = authService;
    this.validatorChain = validatorChain;
    this.loginValidator = loginValidator;
  }

    register = asyncHandler(async (req, res) => {
    const validation = await this.validatorChain.validate(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    try {
      const user = await this.authService.register(req.body);
      res.status(201).json('User Regiesterd Successfully', user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  login = asyncHandler(async(req, res) =>{
    const validation = await this.loginValidator.validate(req.body);
    if(!validation.isValid){
        return res.status(400).json({ errors: validation.errors });
    }

    try {
        const {user, token} = await this.authService.login(req.body);
        res.status(200).json({...user, token});
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
  });

    verify = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = await this.authService.verifyToken(token);
      res.status(200).json({ isValid: true, user: decoded });
    } catch (error) {
      res.status(401).json({ isValid: false, error: error.message });
    }
  });
}

module.exports = AuthController;
