import Bus from './EventBus'

const install = (Vue) => {
  Vue.prototype.$dialog = {
    push: (component, props = {}) => Bus.$emit('dialog:push', { component, props }),
    close: () => Bus.$emit('dialog:close'),
    kill: () => Bus.$emit('dialog:kill'),
  }
}

export default { install }
