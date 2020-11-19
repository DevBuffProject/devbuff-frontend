import Controller from './Controller'

const install = (Vue) => {
  Vue.prototype.$dialog = Controller
}

export default { install }
