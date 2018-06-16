const debug = require('debug')('http')

module.exports = app => {
  app.use((err, req, res, next) => {
    debug(err)
    const errorName = err.name ? err.name : 'InternalError'
    const errorMessage = err.message ? err.message : 'Internal Server Error'
    const errorStatus = err.status ? err.status : 500
    const errStack =
      app.get('env') === 'development' && err.stack ? err.stack : undefined

    return res.status(errorStatus).render('error', {
      name: errorName,
      message: errorMessage,
      code: errorStatus,
      stack: errStack
    })
  })

  // catch not found
  app.use((req, res, next) => {
    return res.status(404).render('error', {
      name: 'NotFound',
      message: 'Not found',
      code: 404
    })
  })
}
