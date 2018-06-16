const cors = require('cors')
const exphbs = require('express-handlebars')
const moment = require('moment')
const morgan = require('morgan')

module.exports = app => {
  app.use(morgan('dev'))
  app.use(cors())

  app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: {
        moment: input => {
          return moment(input).format('MMMM Do YYYY, h:mm:ss a')
        }
      }
    })
  )
  app.set('view engine', '.hbs')
}
