<template>
  <div class="v-app">
    <v-dialog />
      <div class="v-app__viewport">
        <slot />
      </div>
  </div>
</template>

<script>
export default {
  name: 'v-app',
}
</script>

<style lang="scss" scoped>
.v-app {
  background-color: var(--color-background);

  &__viewport {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
}
</style>
