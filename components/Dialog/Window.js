import bus from '~/components/Bus'

export default {
  methods: {
    resolve(payload = null) {
      bus.emit('dialog:resolve', payload)
    },
    reject(payload = null) {
      bus.emit('dialog:reject', payload)
    },
    close() {
      bus.emit('dialog:close')
    },
    kill() {
      bus.emit('dialog:kill')
    },
    postSizes() {
      bus.emit('dialog:ready', {
        offsetHeight: this.$el.offsetHeight,
        offsetWidth: this.$el.offsetWidth
      })
    }
  },

  mounted() {
    if (process.client) {
      const observer = new MutationObserver(this.postSizes)

      observer.observe(this.$el, {
        childList: true, // наблюдать за непосредственными детьми
        subtree: true, // и более глубокими потомками
      })
    }

    this.postSizes()
  }
}
