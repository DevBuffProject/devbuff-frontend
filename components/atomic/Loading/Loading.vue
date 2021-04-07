<template>
  <v-icon class="loading" :icon="['fas', 'circle-notch']" />
</template>

<script>
export default {
  name: 'VLoading',
}
</script>

<style lang="scss" scoped>
.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
