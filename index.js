const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const expressValidator = require('express-validator')
const path = require('path')

const PORT = 3000
const app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(expressValidator());

app.use('/', router)

app.listen(PORT, () => {
    console.log(`server listens on port ${PORT}`)
})