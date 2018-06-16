const cors = require('cors')
const exphbs = require('express-handlebars')
const moment = require('moment')

module.exports = app => {
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
