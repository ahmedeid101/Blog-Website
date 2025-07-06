const Validator = require('./Validator');

class UsernameValidator extends Validator {
  async validate(data) {
    if (!data.username || data.username.trim().length < 3) {
      return { isValid: false, errors: ['Username must be at least 3 characters'] };
    }
    
    if (data.username.length > 30) {
      return { isValid: false, errors: ['Username cannot exceed 30 characters'] };
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(data.username)) {
      return { isValid: false, errors: ['Username can only contain letters, numbers and underscores'] };
    }

    return super.validate(data);
  }
}

module.exports = UsernameValidator;