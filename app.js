const express = require('express')

const { internalConfig, config } = require('./config/config')()
const axios = require('./config/axios')(internalConfig)

const app = express()

// setup express app
require('./config/express')(app)

app.get('/', async (req, res, next) => {
  try {
    const resp = await Promise.all([
      axios.get(`/boards/${internalConfig.board_id}`),
      axios.get('/?statistics=true')
    ])
    const boardResp = resp[0]
    const projectResp = resp[1]
    const lists = boardResp.data.lists
    const project = projectResp.data

    if (boardResp.status !== 200) {
      const err = new Error(
        `Non-200 response code from GitLab: ${boardResp.status}`
      )
      err.status = boardResp.status
      return next(err)
    }

    const maps = lists.map(async list => {
      const resp = await axios.get(`/issues?labels=${list.label.name}`)
      list.issues = resp.data
      list.noIssues = list.issues.length < 1
    })

    await Promise.all(maps)

    const sendData = {
      lists,
      project,
      config
    }
    return res.render('home', sendData)
  } catch (err) {
    return next(err)
  }
})

// setup error handlers
require('./lib/errorHandler')(app)

module.exports = app
