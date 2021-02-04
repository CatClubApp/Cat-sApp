const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.secret_key);
}

function verify(token) {
    return jwt.verify(token, process.env.secret_key)
}

module.exports = { generateToken, verify }