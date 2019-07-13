const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const DEBUG = process.env.DEBUG
const app = new express()

app.use(morgan('short'))
app.use(helmet())

let port = process.env.PORT || 4000
app.listen(port, () => {
    let message = DEBUG ? 'Starting development server on port' : 'App listening on port'
    console.log(message, `${port}...`)
})
