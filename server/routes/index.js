const express = require('express')
const app = express.Router()
const Controller = require('../controller/index')

app.get('/home', Controller.home)
app.get('/login', Controller.login)
app.get('/register', Controller.register)

module.exports = app