import controller from './controller'

export default {
  install(Vue) {
    Vue.prototype.$notify = controller
  },
  inject(inject) {
    inject('notify', controller)
  },
}
