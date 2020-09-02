<template>
  <span
    :class="[
      'image',
      tile && 'image--tile'
    ]"
  >
    <img
      v-if="ready"
      :src="src"
      class="image__img"
    />
    <v-loading
      v-else
      class="image__loading"
    />
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
    cover: {
      type: String,
      default: null,
    },
    tile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ready: false
    }
  },
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
.image {
  background-size: cover;
  background-position: center;
  background-color: var(--color-muted);
  width: 100px;
  height: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;

  &--tile {
    border-radius: 0;
  }

  &__loading {
    opacity: .5;
  }

  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>
