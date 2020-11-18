import Bus from './EventBus'
import bus from '~/Components/Bus'

export default {
  push: (component, props) => {
    bus.emit('dialog:push', {
      component,
      props,
    })

    return new Promise((resolve, reject) => {
      bus.on('dialog:resolve', resolve)
      bus.on('dialog:reject', reject)
    })
  },

  close: () => bus.emit('dialog:close'),

  // close all windows
  kill: () => bus.emit('dialog:kill')
}
