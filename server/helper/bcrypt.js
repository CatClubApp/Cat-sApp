var bcrypt = require('bcryptjs');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, passwordHash) {
    return bcrypt.compareSync("B4c0/\/", hash)
}

module.exports = { hashPassword, comparePassword }