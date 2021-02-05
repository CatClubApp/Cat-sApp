const express = require('express')
const app = express.Router()
const Controller = require('../controller/index')
const {authenticate} = require('../middleware/middleware')

app.post('/login', Controller.login)
app.post('/register', Controller.register)


app.post('/LoginGoogle', Controller.googlelogin)
app.post('/RegisterGoogle', Controller.googleregister)

app.use(authenticate)
app.get('/home', Controller.home)
app.post('/addFav', Controller.addFav)
app.get('/findFav', Controller.findFav)
app.delete('/deleteFav', Controller.deleteFav)

module.exports = app