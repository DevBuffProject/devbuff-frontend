<template>
  <div class="bg-gray-50 dark:bg-blueGray-900 min-h-screen">
    <v-dialog-container />
    <div :class="$style.Grid">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VApp',
}
</script>

<style module>
.Grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
