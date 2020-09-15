<template>
  <div
    v-show="show"
    :class="[
      'page-loading',
      show && 'page-loading--shown'
    ]"
  >
    <div class="page-loading__bar-snake" />
    <v-loading class="page-loading__spinner" />
  </div>
</template>

<script>
export default {
  name: 'v-page-loading',

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

<style lang="scss" scoped>
.page-loading {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99999999;
  position: fixed;
  overflow: hidden;

  &__bar-snake {
    height: 3px;
    width: 30%;
    background-color: #3051ff;
    animation: 1.5s ease snake infinite;
    position: relative;
  }

  &__spinner {
    position: fixed;
    right: 10px;
    top: 10px;
  }
}

@keyframes snake {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style>
