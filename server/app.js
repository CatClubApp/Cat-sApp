require('dotenv').config()
const express = require('express')
const { json } = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./routes/index')
app.use(json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})