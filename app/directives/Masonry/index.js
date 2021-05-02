import mitt from 'mitt'

const bus = mitt()

export default {
  install(Vue) {
    const masonry = {
      inserted(el, binding) {
        if (process.server) return

        const options =
          binding.value && typeof binding.value === 'object'
            ? binding.value
            : {}
        const Masonry = require('masonry-layout')
        const masonry = new Masonry(el, options)
        const repaint = () =>
          Vue.nextTick(() => {
            masonry.reloadItems()
            masonry.layout()
          })

        Vue.nextTick(repaint)
        bus.on('update', () => {
          Vue.nextTick(repaint)
        })
      },
      update() {
        bus.emit('update')
      },
    }
    Vue.directive('masonry', masonry)
  },
}
