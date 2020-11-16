import Bus from './EventBus'

export default {
  push: (component, props) => {
    Bus.$emit('dialog:push', {
      component,
      props,
    })

    return new Promise((resolve, reject) => {
      Bus.$on('dialog:resolve', resolve)
      Bus.$on('dialog:reject', reject)
    })
  },

  close: () => Bus.$emit('dialog:close'),

  // close all windows
  kill: () => Bus.$emit('dialog:kill')
}
