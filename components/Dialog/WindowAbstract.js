import Bus from './EventBus'

export default {
  methods: {
    postSizes() {
      Bus.$emit('dialog:ready', {
        offsetHeight: this.$el.offsetHeight,
        offsetWidth: this.$el.offsetWidth
      })
    }
  },

  mounted() {
    this.postSizes()
  },

  updated() {
    this.postSizes()
  },
}
