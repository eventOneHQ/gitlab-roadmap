const express = require('express')

const app = express()

// setup express app
require('./config/express')(app)

app.use('/', require('./routes')())

// setup error handlers
require('./lib/errorHandler')(app)

module.exports = app
