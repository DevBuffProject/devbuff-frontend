<template>
  <div class="logo">
    <img :src="src" alt="logo" class="logo__image" />
  </div>
</template>

<script>
export default {
  props: {
    'beta-label': Boolean,
    'alpha-label': Boolean,
    src: String
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&display=swap');

.logo {
  &__image {
    width: inherit;
    height: inherit;
  }
}
</style>
