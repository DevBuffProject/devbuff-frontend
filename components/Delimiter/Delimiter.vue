<template>
  <div class="delimiter">
    <span class="delimiter__text">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'v-delimiter',
  
  props: {
    text: {
      type: String,
      default: 'или'
    }
  }
}
</script>

<style lang="scss" scoped>
.delimiter {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
  &:after,
  &:before {
    content: '';
    border-bottom: 1px solid var(--color-muted);
    width: 100%;
    transform: translateY(1px);
  }
  &__text {
    margin: 0 10px;
  }
}
</style>
