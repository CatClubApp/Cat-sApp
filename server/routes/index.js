const express = require('express')
const app = express.Router()
const Controller = require('../controller/index')
const {authenticate} = require('../middleware/middleware')

app.use(authenticate)
app.get('/home', Controller.home)
app.post('/login', Controller.login)
app.post('/register', Controller.register)

module.exports = app