import controller from './controller'

export default {
  install(Vue) {
    Vue.prototype.$dialog = controller
  },
  inject(inject) {
    inject('dialog', controller)
  },
}
