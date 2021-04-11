import bus from '@/app/event-bus'

export default {
  methods: {
    start() {
      bus.emit('progress:start')
    },
    finish() {
      bus.emit('progress:finish')
    },
  },
  render: (h) => h('i'),
}
