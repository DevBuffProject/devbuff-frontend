<template>
  <v-app id="app">
    <v-header />
    <main class="viewport">
      <nuxt />
    </main>
  </v-app>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr;
  background-color: var(--color-background);
}
.viewport {
  perspective: 1000px;
}
</style>
