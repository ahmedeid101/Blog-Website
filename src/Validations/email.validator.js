const Validator = require('./Validator');

class EmailValidator extends Validator {
  async validate(data) {
    if (!data.email) {
      return { isValid: false, errors: ['Email is required'] };
    }

    const testEmail = data.email.toString().toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(testEmail)) {
      console.warn(`Failed email validation: ${testEmail}`);
      return { isValid: false, errors: ['Invalid email format'] };
    }
    
    //console.log(`Email validated successfully: ${testEmail}`);
    return super.validate(data);
  }
}

module.exports = EmailValidator;