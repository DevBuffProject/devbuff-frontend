<template>
  <div>
    <div>
      <slot name="header" />
    </div>
    <slot />
    <div class="d-flex justify-content-end mt-4">
      <slot name="controls" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-dialog-viewport',
}
</script>

<style lang="css" scoped>
</style>
