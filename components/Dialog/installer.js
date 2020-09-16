import Bus from './EventBus'

const install = (Vue) => {
  Vue.prototype.$dialog = {
    push: (component, props = {}, on) => Bus.$emit('dialog:push', {
      listeners: on,
      component,
      props,
    }),

    close: () => Bus.$emit('dialog:close'),
    kill: () => Bus.$emit('dialog:kill'),
  }
}

export default { install }
