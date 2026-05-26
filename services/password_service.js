const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const hashed_password = await bcrypt.hash(password, 10);
    return hashed_password;
}

async function checkPassword(password) {
    const isMatch = await bcrypt.compare(password);
    return isMatch;
}

module.exports = {
    hashPassword,
    checkPassword
}