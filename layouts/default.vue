<template>
  <v-app class="viewport">
    <v-header />
    <main>
      <nuxt />
    </main>
    <v-footer class="mt-3" />
  </v-app>
</template>

<style lang="scss" scoped>
.viewport {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
