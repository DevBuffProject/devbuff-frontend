<template>
  <div class="app">
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

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr;
  background-color: var(--color-background);
}
</style>
