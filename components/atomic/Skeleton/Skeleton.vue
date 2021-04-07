<template>
  <div keep></div>
</template>

<script>
export default {
  name: 'VSkeleton',
  props: {
    figure: {
      type: String,
      default: 'line',
      validate: (v) => ['square', 'circle', 'line'].includes(v),
    },
  },
}
</script>
