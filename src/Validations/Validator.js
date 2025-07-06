class Validator {
  constructor() {
    this.nextValidator = null;
  }

  setNext(validator) {
    this.nextValidator = validator;
    return validator;
  }

  async validate(data) {
    if (this.nextValidator) {
      return this.nextValidator.validate(data);
    }
    return { isValid: true, errors: [] };
  }
}

module.exports = Validator;