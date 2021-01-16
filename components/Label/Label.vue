<template>
  <label class="block mt-4">
    <div class="text-xs mb-1 text-gray-400 dark:text-blueGray-500">
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
    name: String,
  }
}
</script>
