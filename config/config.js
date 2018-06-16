require('dotenv').config()

const getConfig = () => {
  const internalConfig = {}
  const config = {}

  // convert undefined, true, and false string to type
  const convert = input => {
    if (input === 'undefined') {
      return undefined
    } else if (input === 'false') {
      return false
    } else if (input === 'true') {
      return true
    }
    return input
  }

  const loadConfig = (prefix, object) => {
    for (const key in process.env) {
      if (key.startsWith(prefix)) {
        const newValue = convert(process.env[key])
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
