class PasswordStrategy {
  async hash(password) {
    throw new Error('hash method must be implemented');
  }

  async compare(password, hashedPassword) {
    throw new Error('compare method must be implemented');
  }
}

module.exports = PasswordStrategy;