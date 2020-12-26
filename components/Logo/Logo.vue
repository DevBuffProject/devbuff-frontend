<template>
  <div class="logo">
    <img src="/logos/Logo.svg" alt="logo" class="logo__image" />
  </div>
</template>

<script>
export default {
  props: {
    'beta-label': Boolean,
    'alpha-label': Boolean
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
