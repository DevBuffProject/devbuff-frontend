<template functional>
  <div class="logo">
    <div class="logo__circle" />
    <div class="logo__text"> DevBuff </div>
    <div class="logo__label">α</div>
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
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&display=swap');

.logo {
  -webkit-font-smoothing: antialiased;
  padding: 10px;
  color: #000;
  display: flex;
  align-items: center;
  cursor: default;
  user-select: none;
  &__circle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: red;
    margin-right: 10px;
  }
  &__text {
    font-family: 'Stardos Stencil', cursive;
    font-weight: 700;
    font-size: 25px;
  }
  &__label {
    margin-left: 10px;
    font-size: 20px;
    opacity: .3;
    line-height: .35;
    align-self: baseline
  }
}
</style>
