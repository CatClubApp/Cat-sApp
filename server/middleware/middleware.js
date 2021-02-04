const { verify } = require('../helper/jwt')

const authenticate = function (req, res, next) {
    try {
        const token = req.headers.access_token
        const decoded = verify(token, process.env.secret_key)
        req.decoded = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: 'Please Login First'
        })
    }
}
module.exports = { authenticate }
