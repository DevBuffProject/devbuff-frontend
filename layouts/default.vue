<template>
  <div>
    <v-app :class="$style.viewport">
      <v-header />
      <main>
        <nuxt />
      </main>
      <v-footer class="mt-3" />
    </v-app>
  </div>
</template>

<style module>
.viewport {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
