<template>
  <div class="page-loading">
    <v-progress v-show="show" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    start() {
      this.show = true
    },
    finish() {
      this.show = false
    }
  }
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
