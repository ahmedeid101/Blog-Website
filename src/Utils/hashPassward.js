const bcrypt = require('bcryptjs');

// Hash a password
async function hashedPassword(password) {
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hash = await bcrypt.hash(password, salt); // Hash the password
    return hash;
}

// Verify a password
async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = {hashedPassword, verifyPassword};