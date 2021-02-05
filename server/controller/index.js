const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const axios = require('axios');

class Controller {
    static home(req, res, next) {
        // res.status(200).json({ msg: 'halo' })
       axios.get('https://aws.random.cat/meow')
       .then(response => {
           return response.data
       })
       .then(data => {
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then(cat => {
            res.status(200).json({
                data,
                cat : cat.data[0]
            })
        })
       })
       .catch(err => {
           console.log(err)
       })

      
    }
    static login(req, res, next) {
        const { name, email, password } = req.body
        const dataUser = { name, email, password }
        User.findOne({
            where: {
                email: dataUser.email
            }
        })
            .then(found => {
                if (!found) throw ({
                    name: 'user not found',
                    message: 'Wrong Email and Password'
                })
                const compare = comparePassword(dataUser.password, found.password)
                if (compare === false) throw ({
                    name: 'dont have access token',
                    message: 'Wrong Email and Password'
                })
                const token = generateToken({
                    id: found.id,
                    name: found.name,
                    email: found.email,
                    password: found.password
                })
                res.status(201).json({ name: found.name, access_token: token })
            })
            .catch(err => {
                //console.log(err)
                // if (err === null) res.status(404).json({ msg: 'User not found' })
                // if (err === false) res.status(400).json({ msg: 'Email/Password is wrong' })
                // else res.status(500).json(err)
                next(err)
            })
    }
    static register(req, res, next) {
        const { name, email, password } = req.body
        const newUser = { name, email, password }
        User.create(newUser)
            .then(success => {
                res.status(201).json({ success })
            })
            .catch(err => {
                next(err)
            })
    }

    static googleregister(req, res, next) {
        let dataGoogleUser = {}
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                dataGoogleUser.name = payload.name
                dataGoogleUser.email = payload.email
                dataGoogleUser.password = process.env.googlePass
                console.log(dataGoogleUser)
                return User.create(dataGoogleUser)
            })
            .then(success => {
                res.status(201).json({ success })
            })
            .catch(err => {
                res.status(500).json({ err: 'anjay' })
            })
    }

    static googlelogin(req, res, next) {
        console.log('masuk google login')
        let dataGoogleUser = {}
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                dataGoogleUser.name = payload.name
                dataGoogleUser.email = payload.email
                dataGoogleUser.password = process.env.googlePass
                return User.findOne({
                    where: {
                        email: dataGoogleUser.email
                    }
                })
            })
            .then(data => {
                if (!data) throw data
                const compare = comparePassword(dataGoogleUser.password, data.password)
                if (compare === false) throw compare
                const token = generateToken({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
                res.status(201).json({ name: data.name, access_token: token })
            })
            .catch(err => {
                if (err === null) res.status(404).json({ msg: 'Data not found' })
                if (err === false) res.status(400).json({ msg: 'Email/Password is wrong' })
                else res.status(500).json(err)
            })
    }
}
module.exports = Controller