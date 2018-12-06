const cors = require('cors')
const exphbs = require('express-handlebars')
const moment = require('moment')
const morgan = require('morgan')
const debug = require('debug')('glrm:express')

const { internalConfig, config } = require('../config')()
const axios = require('../config/axios')(internalConfig)

module.exports = async app => {
  // set config globals
  app.locals.config = config
  app.locals.appEnabled = internalConfig.gl_app
  try {
    const projectResp = await axios.get('/')
    app.locals.project = projectResp.data
  } catch (err) {
    debug(err)
  }

  // setup middleware
  app.use(morgan('dev'))
  app.use(cors())

  // setup view engine
  app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: {
        moment: input => moment(input).format('MMMM Do YYYY'),
        eq: (current, state) => state === current
      }
    })
  )
  app.set('view engine', '.hbs')
}
