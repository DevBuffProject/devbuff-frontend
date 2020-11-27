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
    font-size: .98em !important;
    line-height: 1.4;
    font-weight: 500;
  }

  b, strong {
    font-weight: 600;
  }

  @each $heading in 2, 3 {
    h#{$heading} {
      font-weight: 600;
      font-size: #{1 + $heading * 2 / 10}em !important;
      margin-bottom: .5em;
    }
  }


  li {
    padding-right: .5rem;
    list-style-type: none;
  }
  li:before {
    content: "—";
    color: var(--color-black-fade);
    margin-right: .5rem;
  }

  p, ul, ol, img, code, video {
    padding: 0;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>
