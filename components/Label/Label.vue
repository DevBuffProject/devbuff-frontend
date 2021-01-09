<template>
  <div class="v-label">
    <div class="v-label__name"> {{ name }} </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-label',

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.v-label {
  &__name {
    color: var(--color-text);
    font-size: .8rem;
    font-weight: 300;
    opacity: .5;
    margin-bottom: .05rem;
  }
}
</style>
