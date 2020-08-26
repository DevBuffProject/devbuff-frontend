<template>
  <transition
    :name="name"
    :mode="mode"
  >
    <slot />
  </transition>

</template>

<script>
export default {
  name: 'v-anim',

  props: {
    name: {
      type: String,
      default: 'next'
    },
    mode: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
