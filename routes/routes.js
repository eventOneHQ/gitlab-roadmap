const express = require('express')

const getRoadmap = require('../lib/getRoadmap')

const router = express.Router()

module.exports = () => {
  router.get('/', async (req, res, next) => {
    try {
      const lists = await getRoadmap(req.user)

      return res.status(200).render('home', {
        lists,
        user: req.user
      })
    } catch (err) {
      return next(err)
    }
  })

  router.get('/api/v1/roadmap', async (req, res, next) => {
    try {
      const lists = await getRoadmap(req.user)

      return res.status(200).json({
        lists
      })
    } catch (err) {
      return next(err)
    }
  })

  return router
}
