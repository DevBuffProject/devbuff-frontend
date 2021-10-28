<template>
  <span
    class="font-semibold px-2 py-0.5 -my-0.5 leading-6 rounded-md"
    :class="{
      'bg-green-200 text-green-600': color === 'green',
      'bg-red-200 text-red-600': color === 'red',
      'bg-yellow-200 text-yellow-600': color === 'yellow',
      'bg-light-700 ': !color,
    }"
  >
    <slot />
  </span>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  color: { type: String, default: null },
})
</script>
