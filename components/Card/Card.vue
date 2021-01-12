<template>
  <div class="v-card" v-on="$listeners">
    <div v-if="$slots.header" class="v-card__header">
      <slot name="header" />
    </div>
    <div class="v-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="v-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-card',
}
</script>

<style lang="scss" scoped>
@layer components {
  .v-card {
    @apply bg-background-contrast p-4 rounded-md border border-muted;
  }
}
</style>
