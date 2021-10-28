<template>
  <div
    class="
      shadow-lg shadow-dark-50
      dark:shadow-black dark:shadow-3xl
      bg-white
      dark:bg-dark-800
      p-4
      rounded-xl
      relative
      overflow-hidden
      break-all
    "
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { useAttrs, useSlots } from 'vue'

const attrs = useAttrs()
const slots = useSlots()
</script>
