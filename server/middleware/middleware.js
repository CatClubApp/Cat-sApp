const verify = require('../helper/jwt')

const authenticate = function(req,res,next){
    try{
        const token = req.headers.token
        const decoded = verify(token, process.env.SECRET)
        req.decoded = decoded
    }catch (err){
        res.status(401).json({
            message: 'Please Login First'
        })
    }
}
module.exports = {authenticate}