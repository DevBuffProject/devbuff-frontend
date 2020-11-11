<template>
  <article class="v-article">
    <slot />
  </article>
</template>

<script>
export default {
  name: 'v-article'
}
</script>

<style lang="scss" scoped>
  .v-article {
    /deep/ * {
      font-family: var(--font-family);
    }

    @each $heading in 2, 3 {
      /deep/ h#{$heading} {
        margin-bottom: #{($heading - 1) * .5}rem;
      }
    }

    @each $tag in ul, ol, p, blockquote {
      /deep/ #{$tag} {
        font-size: 1rem;
        font-weight: 300;
      }
    }
  }
</style>
