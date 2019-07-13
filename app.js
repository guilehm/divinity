const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const DEBUG = process.env.DEBUG
const app = new express()

app.use(morgan('short'))
app.use(helmet())

const getUserController = require('./controllers/get-user-controller')

app.get('/', getUserController)

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '127.0.0.1'

app.listen(PORT, HOST, () => {
    let message = DEBUG ? 'Starting development server on' : 'App listening on'
    console.log(message, `http://${HOST}:${PORT}`)
})
