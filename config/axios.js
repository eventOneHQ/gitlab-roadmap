const axios = require('axios')

const setupAxios = internalConfig => {
  const axiosInstance = axios.create({
    baseURL: `${internalConfig.url}/api/v4/projects/${encodeURIComponent(
      internalConfig.project_id
    )}`,
    headers: {
      'Private-Token': internalConfig.token
    }
  })

  return axiosInstance
}

module.exports = setupAxios
