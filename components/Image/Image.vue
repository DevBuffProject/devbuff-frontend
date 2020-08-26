<template>
  <span
    :class="[
      'image',
    ]"
    :style="cover && styles"
  >
    <v-loading
      v-show="!ready"
      :class="[
        'image__loading'
      ]"
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
  },
  computed: {

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

  &__loading {
    opacity: .5;
  }

  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>
