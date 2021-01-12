<template>
  <label class="v-label">
    <div class="v-label__name">
      <slot v-if="$slots.label" />
      <span v-else> {{ name }} </span>
    </div>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'v-label',

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .v-label {
    &__name {
      @apply text-gray-400 text-sm mb-1;
      font-weight: 300;
    }
  }
}
</style>
