class Controller {
    static home(req, res) {
        res.status(200).json({ msg: 'Success Home' })
    }
    static login(req, res) {
        res.status(200).json({ msg: 'Success login' })
    }
    static register(req, res) {
        res.status(200).json({ msg: 'Success register' })
    }
}
module.exports = Controller