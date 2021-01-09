<template>
  <v-app>
    <v-header />
    <main class="viewport">
      <nuxt />
    </main>
    <v-footer class="mt-3" />
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$router.afterEach(() => {
      console.log(this.$router.history)
    })
  }
}
</script>
