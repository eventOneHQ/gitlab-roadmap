const { internalConfig } = require('../config')()
const axios = require('../config/axios')(internalConfig)

const getRoadmap = async user => {
  try {
    let axiosConfig = {}

    if (user && user.accessToken) {
      axiosConfig.headers = {
        Authorization: `Bearer ${user.accessToken}`,
        'Private-Token': null
      }
    }

    // get the board
    const boardResp = await axios.get(
      `/boards/${internalConfig.board_id}`,
      axiosConfig
    )
    const listsData = boardResp.data.lists

    // handle errors...
    if (boardResp.status !== 200) {
      const err = new Error(
        `Non-200 response code from GitLab: ${boardResp.status}`
      )
      err.status = boardResp.status
      throw err
    }

    // get all the issues for each list
    const listMaps = listsData.map(async list => {
      const resp = await axios.get(
        `/issues?labels=${list.label.name}`,
        axiosConfig
      )

      let filtered
      if (!user) {
        // filter out confidential issues when not logged in
        filtered = resp.data.filter(issue => !issue.confidential)
      } else {
        filtered = resp.data
      }

      list.issues = filtered
      list.noIssues = list.issues.length < 1

      return list
    })

    const lists = await Promise.all(listMaps)

    return lists
  } catch (err) {
    throw err
  }
}

module.exports = getRoadmap
