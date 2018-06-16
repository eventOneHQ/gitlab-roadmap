require('dotenv').config()

const getConfig = () => {
  const internalConfig = {}
  const config = {}

  // convert undefined string to actual undefined
  const convertUndefined = input => {
    if (input === 'undefined') {
      return undefined
    }
    return input
  }

  const loadConfig = (prefix, object) => {
    for (const key in process.env) {
      if (key.startsWith(prefix)) {
        const newValue = convertUndefined(process.env[key])
        const newKey = key.replace(prefix, '').toLowerCase()

        object[newKey] = newValue
      }
    }
  }
  loadConfig('GL_RM_CONFIG_', config)
  loadConfig('GL_RM_INT_CONFIG_', internalConfig)

  return { config, internalConfig }
}

module.exports = getConfig
