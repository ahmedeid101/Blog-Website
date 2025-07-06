const Validator = require('./Validator');
const Joi = require('joi');

class LoginValidator extends Validator {
  constructor() {
    super();
    this.schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Password is required',
      }),
    });
  }

  async validate(data) {
    const { error } = this.schema.validate(data, {
      abortEarly: false, // Collect all errors (not just the first one)
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

module.exports = LoginValidator;


