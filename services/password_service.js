const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const hashed_password = await bcrypt.hash(password, 10);
    return hashed_password;
}

async function checkPassword(password, encryptedPassword) {
    const isMatch = await bcrypt.compare(password, encryptedPassword);
    return isMatch;
}

module.exports = {
    hashPassword,
    checkPassword
}