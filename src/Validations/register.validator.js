const Validator = require('./Validator');
const Joi = require('joi');

class RegisterValidator extends Validator {
  constructor() {
    super();
    this.schema = Joi.object({
      username: Joi.string().min(1).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must not be empty',
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'string.empty': 'Email is required',
      }),
      password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.empty': 'Password is required',
      }),
      role: Joi.string().valid('user', 'admin').required().messages({
        'any.only': 'Role must be either user or admin',
      }),
    });
  }

  async validate(data) {
    const { error } = this.schema.validate(data, { 
      abortEarly: false, // Return all errors, not just the first one
      allowUnknown: false, // Reject unknown fields
    });

    if (error) {
      return {
        isValid: false,
        errors: error.details.map((err) => err.message),
      };
    }

    return super.validate(data);
  }
}

module.exports = RegisterValidator;
