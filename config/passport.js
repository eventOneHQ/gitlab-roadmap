const passport = require('passport')
const GitLabStrategy = require('passport-gitlab2').Strategy
const cookieSession = require('cookie-session')
const express = require('express')

const { internalConfig } = require('./config')()

const router = express.Router()

module.exports = app => {
  // only enable if gl_app var is true
  if (internalConfig.gl_app) {
    // cookieSession config
    app.use(
      cookieSession({
        name: 'glrm_session',
        maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
        keys: [internalConfig.cookie_secret]
      })
    )

    app.use(passport.initialize()) // Used to initialize passport
    app.use(passport.session()) // Used to persist login sessions

    passport.use(
      new GitLabStrategy(
        {
          clientID: internalConfig.gl_client_id,
          clientSecret: internalConfig.gl_client_secret,
          callbackURL: `${internalConfig.base_url}/auth/gitlab/callback`,
          baseURL: internalConfig.url
        },
        (accessToken, refreshToken, profile, cb) => {
          const user = {
            id: profile.id,
            username: profile.username,
            accessToken
          }
          return cb(null, user)
        }
      )
    )

    passport.serializeUser((user, done) => {
      done(null, user)
    })

    // Used to decode the received cookie and persist session
    passport.deserializeUser((user, done) => {
      done(null, user)
    })

    // passport.authenticate middleware is used here to authenticate the request
    router.get(
      '/gitlab',
      passport.authenticate('gitlab', {
        scope: ['api'] // Used to specify the required data
      })
    )

    // The middleware receives the data from GitLab and runs the function on Strategy config
    router.get(
      '/gitlab/callback',
      passport.authenticate('gitlab'),
      (req, res) => {
        res.redirect('/')
      }
    )

    // Logout route
    router.get('/logout', (req, res) => {
      req.logout()
      res.redirect('/')
    })

    app.use('/auth', router)
  }
}
