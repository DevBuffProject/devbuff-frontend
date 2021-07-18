<template>
  <label class="block">
    <div class="text-xs mb-1 text-gray-400 dark:text-dark-100">
      <slot v-if="$slots.label" />
      <span v-else> {{ name }} </span>
    </div>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'VLabel',

  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>
