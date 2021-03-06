require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler');
const bookmarksServer = require('./bookmarksServer/bookmarksServer')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(cors())
app.use(morgan(morganOption))
app.use(helmet())
app.use(bookmarksServer)


app.use(errorHandler)

module.exports = app