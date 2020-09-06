<template>
  <div
    :class="[
      'skeleton',
      figure && 'skeleton--figure-' + figure
    ]"
  />
</template>

<script>
export default {
  name: 'v-skeleton',

  props: {
    figure: {
      type: String,
      default: 'square',
      validate: (v) => ['circle', 'line'].includes(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.skeleton {
  background-color: var(--color-muted);
  position: relative;
  border-radius: 4px;
  width: 40px;
  flex: 0 0 40px;
  height: 40px;
  overflow: hidden;

  &:after {
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0));
    content: "";
    height: 100%;
    min-width: 200px;
    width: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    animation: loading 1.5s infinite;
  }

  &--figure-circle {
    border-radius: 50%;
  }
  &--figure-tile {
    border-radius: 4px;
  }
  &--figure-line {
    height: 10px;
    width: 100%;
    flex: initial;
  }
}

@keyframes loading {
  to {
    transform: translateX(100%);
  }
}
</style>
