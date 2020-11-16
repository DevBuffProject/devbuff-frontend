import Bus from './EventBus'

export default {
  methods: {
    resolve(payload = null) {
      Bus.$emit('dialog:resolve', payload)
    },
    reject(payload = null) {
      Bus.$emit('dialog:reject', payload)
    },
    close() {
      Bus.$emit('dialog:close')
    },
    kill() {
      Bus.$emit('dialog:kill')
    },
    postSizes() {
      Bus.$emit('dialog:ready', {
        offsetHeight: this.$el.offsetHeight,
        offsetWidth: this.$el.offsetWidth
      })
    }
  },

  mounted() {
    if (process.client) {
      const observer = new MutationObserver(() => {
        console.log('modalupdated')
        this.postSizes()
      })

      observer.observe(this.$el, {
        childList: true, // наблюдать за непосредственными детьми
        subtree: true, // и более глубокими потомками
      })
    }

    this.postSizes()
  },

  updated() {
    this.postSizes()
  },
}
