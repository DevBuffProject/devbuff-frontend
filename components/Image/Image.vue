<template>
  <span
    class="v-image"
    :class="{ 'rounded-full': rounded }"
    :style="[
      ready && { 'background-image': `url(${src})` },
      { width: size, height: size, flex: `0 0 ${size}` }
    ]"
    v-bind="$attrs"
  >
    <v-loading v-if="!ready" class="image__loading" />
  </span>
</template>

<script>
export default {
  name: 'v-image',

  props: {
    rounded: Boolean,
    size: {
      type: String,
      default: '100px'
    },
    src: {
      type: String,
      default: null,
      required: true
    }
  },

  data: () => ({
    ready: false
  }),

  mounted() {
    const buffer = new Image()

    new Promise(resolve => {
      buffer.onload = () => resolve(this.ready = true)
      buffer.src = this.src
    })
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .v-image {
    @apply bg-cover bg-center bg-muted inline-flex justify-center items-center rounded;
    overflow: hidden;
    width: 100px;
    height: 100px;

    &__loading {
      @apply opacity-50;
    }
  }
}
</style>
