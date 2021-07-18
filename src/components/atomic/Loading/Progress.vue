<template>
  <div
    class="
      w-full
      rounded-full
      overflow-hidden
      bg-gray-200
      dark:bg-dark-600
      relative
    "
    style="min-width: 300px"
  >
    <em class="absolute h-full w-full left-0 top-0" />
    <div
      class="transition-all h-2 bg-gradient-to-r gradientLaguna rounded-full"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VProgressBar',
  props: {
    progress: {
      type: Number,
      default: 1,
    },
  },
})
</script>
