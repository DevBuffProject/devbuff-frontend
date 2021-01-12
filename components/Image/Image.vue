<template>
  <span class="v-image" :style="ready && { 'background-image': `url(${src})` }">
    <v-loading v-if="!ready" class="image__loading" />
  </span>
</template>

<script>
export default {
  name: 'v-image',

  props: {
    src: {
      type: String,
      default: null,
      required: true
    },
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
