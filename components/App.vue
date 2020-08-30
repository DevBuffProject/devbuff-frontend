<template>
  <div
    :class="[
      'app',
      'colors--light'
    ]"
  >
    <v-dialog />

    <transition name="scale">
      <div>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'v-app',
}
</script>

<style scoped>
</style>
