const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {
    static home(req, res, next) {
        res.status(200).json({ msg: 'Success Home' })
    }
    static login(req, res,next) {
        const { name, email, password } = req.body
        const dataUser = { name, email, password }
        User.findOne({
            where: {
                email: dataUser.email
            }
        })
            .then(found => {
                if (!found) throw ({
                    name : 'user not found',
                    message: 'Wrong Email and Password'
                })
                const compare = comparePassword(dataUser.password, found.password)
                if (compare === false) throw ({
                    name : 'dont have access token',
                    message: 'Wrong Email and Password'
                })

                const token = generateToken({
                    id: found.id,
                    name: found.name,
                    email: found.email,
                    password: found.password
                })
                console.log(found)
                console.log(token)
                res.status(201).json({ name: found.name, access_token: token })
            })
            .catch(err => {
                // if (err === null) res.status(404).json({ msg: 'User not found' })
                // if (err === false) res.status(400).json({ msg: 'Email/Password is wrong' })
                // else res.status(500).json(err)
                next(err)
            })
    }
    static register(req, res,next) {
        const { name, email, password } = req.body
        const newUser = { name, email, password }
        User.create(newUser)
            .then(success => {
                res.status(201).json({ success })
            })
            .catch(err => {
                // res.status(500).json({ err })
                next(err)
            })
    }
}
module.exports = Controller