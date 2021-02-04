const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {
    static home(req, res) {
        res.status(200).json({ msg: 'Success Home' })
    }
    static login(req, res) {
        const { name, email, password } = req.body
        const dataUser = { name, email, password }
        User.findOne({
            where: {
                email: dataUser.email
            }
        })
            .then(found => {
                if (!found) throw found
                const compare = comparePassword(dataUser.password, found.password)
                if (compare === false) throw false
                const token = generateToken({
                    id: found.id,
                    email: found.email,
                    password: found.password
                })
                res.status(201).json({ access_token: token })
            })
            .catch(err => {
                if (err === null) res.status(404).json({ msg: 'User not found' })
                if (err === false) res.status(400).json({ msg: 'Email/Password is wrong' })
                else res.status(500).json(err)
            })
    }
    static register(req, res) {
        const { name, email, password } = req.body
        const newUser = { name, email, password }
        User.create(newUser)
            .then(success => {
                res.status(201).json({ success })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }
}
module.exports = Controller