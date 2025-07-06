const bcrypt = require('bcryptjs');
const PasswordStrategy = require("./password.strategy")

class BcryptStrategy extends PasswordStrategy {
  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = BcryptStrategy;