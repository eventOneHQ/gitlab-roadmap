const express = require('express')

const { internalConfig } = require('../config')()
const axios = require('../config/axios')(internalConfig)

const router = express.Router()

module.exports = () => {
  router.get('/', async (req, res, next) => {
    try {
      let axiosConfig = {}
      if (req.user && req.user.accessToken) {
        axiosConfig.headers = {
          Authorization: `Bearer ${req.user.accessToken}`,
          'Private-Token': null
        }
      }

      const boardResp = await axios.get(
        `/boards/${internalConfig.board_id}`,
        axiosConfig
      )
      const lists = boardResp.data.lists

      if (boardResp.status !== 200) {
        const err = new Error(
          `Non-200 response code from GitLab: ${boardResp.status}`
        )
        err.status = boardResp.status
        return next(err)
      }

      const listMaps = lists.map(async list => {
        const resp = await axios.get(
          `/issues?labels=${list.label.name}`,
          axiosConfig
        )

        let filtered
        if (!req.user) {
          // filter out confidential issues when not logged in
          filtered = resp.data.filter(issue => !issue.confidential)
        } else {
          filtered = resp.data
        }

        list.issues = filtered
        list.noIssues = list.issues.length < 1
      })

      await Promise.all(listMaps)

      return res.render('home', {
        lists,
        user: req.user
      })
    } catch (err) {
      return next(err)
    }
  })

  return router
}
