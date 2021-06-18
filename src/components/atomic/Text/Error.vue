<template>
  <span class="text-danger flex items-center">
    <WarningTriangleIcon class="mr-1 w-5" />
    <span class="text-xs">{{ text }}</span>
  </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: { type: String, default: '' },
  },
})
</script>
