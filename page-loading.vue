<template>
  <i />
</template>

<script>
import bus from '@/app/event-bus'

export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    start() {
      bus.emit('progress:start')
    },
    finish() {
      bus.emit('progress:finish')
    },
  },
}
</script>

<style lang="scss">
.page-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999999;
}
</style>
