const express = require('express')
const app = express.Router()
const Controller = require('../controller/index')
const {authenticate} = require('../middleware/middleware')

app.post('/login', Controller.login)
app.post('/register', Controller.register)

app.use(authenticate)
app.get('/home', Controller.home)

module.exports = app