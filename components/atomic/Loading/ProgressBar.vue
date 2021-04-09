<template>
  <div
    class="w-full rounded-full overflow-hidden bg-gray-200 dark:bg-blueGray-600 relative"
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
export default {
  name: 'VProgressBar',
  props: {
    progress: {
      type: Number,
      default: 1,
    },
  },
}
</script>
