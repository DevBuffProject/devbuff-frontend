<template>
  <article class="v-article">
    <slot />
  </article>
</template>

<script>
export default {
  name: 'v-article',
}
</script>

<style lang="scss" scoped>
.v-article /deep/ {
  * {
    font-size: .98em !important;
    line-height: 1.4;
    font-weight: 500;
  }

  p, ul, ol, img, code, pre, video {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  b, strong { font-weight: 700; }
  pre {
    border-radius: 4px;

    font-family: 'Fira Code', monospace !important
  }

  h2 {
    font-weight: 600;
    font-size: 1.4em !important;
    margin-bottom: .5em;
  }

  li {
    padding-right: .5rem;
    list-style-type: none;
    &:before {
      content: "—";
      color: var(--color-black-fade);
      margin-right: .5rem;
    }
  }
}
</style>
