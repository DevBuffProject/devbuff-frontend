import controller from './controller'

export default {
  install(Vue) {
    Vue.prototype.$dialog = controller
  },
}
