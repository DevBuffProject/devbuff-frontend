<template>
  <div class="v-app theme--light">
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
}
</style>
