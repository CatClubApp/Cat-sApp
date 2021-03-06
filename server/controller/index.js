const { User, Favorite } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const axios = require('axios');

class Controller {
    static home(req, res, next) {

        axios.get('https://aws.random.cat/meow')
            .then(response => {
                return response.data
            })
            .then(data => {
                axios.get('https://api.thecatapi.com/v1/images/search')
                    .then(cat => {
                        return cat.data[0]
                        // res.status(200).json({
                        //     data,
                        //     cat : cat.data[0]
                        // })
                    })
                    .then(fact => {
                        axios.get('https://catfact.ninja/fact?max_length=140')
                            .then(result => {
                                var config = {
                                    method: 'get',
                                    url: 'https://api.thecatapi.com/v1/images/search?format=json',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'x-api-key': process.env.API_KEY
                                    }
                                };
                                axios(config)
                                    .then(api => {
                                        res.status(200).json({
                                            data: data.file,
                                            fact: api.data[0].url,
                                            result: result.data.fact
                                            // result : result.data,
                                            // api : api.data[0]
                                        })

                                    })
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
        console.log('masuk google register')
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
                console.log(err)
                res.status(500).json({ err: 'anjay' })
            })
    }

    static googlelogin(req, res, next) {
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
                res.status(201).json({ id: data.id, name: data.name, access_token: token })
            })
            .catch(err => {
                if (err === null) res.status(404).json({ msg: 'Data not found' })
                if (err === false) res.status(400).json({ msg: 'Email/Password is wrong' })
                else res.status(500).json(err)
            })
    }
    static addFav(req, res) {
        const { data, result, fact, UserId } = req.body
        const dataFav = { data, result, fact, UserId }
        Favorite.create(dataFav)
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static findFav(req, res) {
        Favorite.findAll({
            where: {
                UserId: req.headers.userid
            }
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteFav(req, res) {
        // res.status(201).json(req.headers)
        Favorite.destroy({
            where: {
                id: req.headers.id
            }
        })
            .then(success => {
                res.status(200).json({ msg: 'Success Delete' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = Controller