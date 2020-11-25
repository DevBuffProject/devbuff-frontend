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
.v-article /deep/ {
  * {
    font-weight: 300 !important;
    font-size: .85rem !important;
    line-height: 1.5;
  }

  @each $heading in 2, 3 {
    h#{$heading} {
      margin-bottom: #{($heading - 1) * .5}rem;
    }
  }
  @each $tag in ul, ol, p, blockquote {
    #{$tag} {
      font-size: 1rem;
      padding: 0;
      font-weight: 300;
    }
  }

  li {
    list-style-type: none;
    &:before {
      color: var(--color-black-fade);
      content: "—";
      padding-right: 10px;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: .5rem;
  }
}
</style>
