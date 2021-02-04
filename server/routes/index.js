const express = require('express')
const app = express.Router()
const Controller = require('../controller/index')
const {authenticate} = require('../middleware/middleware')

app.get('/home', Controller.home)
app.use(authenticate)
app.get('/login', Controller.login)
app.get('/register', Controller.register)

module.exports = app