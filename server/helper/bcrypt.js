var bcrypt = require('bcryptjs');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(passwordInput, passwordDatabase) {
    return bcrypt.compareSync(passwordInput, passwordDatabase)
}

module.exports = { hashPassword, comparePassword }