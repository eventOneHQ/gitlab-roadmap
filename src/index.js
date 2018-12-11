import React from 'react'
import ReactDOM from 'react-dom'

import Widget from './Widget'

const namespace = 'GLRM_Widget'

const widget = window => {
  // set default configurations
  let config = {
    widgetRef: 'glrm-widget'
  }

  // all methods that were called till now and stored in queue
  // needs to be called now
  let globalObject = window[window[namespace]]
  let queue = globalObject.q
  if (queue) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() === 'init') {
        config = extendObject(config, queue[i][1])

        ReactDOM.render(<Widget />, document.getElementById(config.widgetRef))
      }
    }
  }

  globalObject.config = config
}

const extendObject = (a, b) => {
  for (const key in b) if (b.hasOwnProperty(key)) a[key] = b[key]
  return a
}

widget(window)
