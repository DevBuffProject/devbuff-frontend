<template>
  <div>
    <v-skeleton
      v-for="row in rows"
      :key="row"
      figure="line"
      :style="(row === rows) && {
        width: '75%',
        marginBottom: 0
      }"
      class="skeleton-paragraph__line"
    />
  </div>
</template>

<script>
export default {
  name: 'v-skeleton-paragraph',

  props: {
    rows: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.skeleton-paragraph {
  &__line:not(:last-of-type) {
    margin-bottom: .5rem;
  }
}
</style>
