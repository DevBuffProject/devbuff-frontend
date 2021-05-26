<template>
  <span
    :class="[
      'overflow-hidden bg-cover inline-flex justify-center items-center',
      'bg-center bg-gray-200 dark:bg-blueGray-600',
    ]"
    :style="[
      ready && { backgroundImage: `url(${src})` },
      {
        width: size,
        height: size,
        flex: `0 0 ${size}`,
      },
    ]"
    v-bind="$attrs"
  >
    <atomic-loading v-if="!ready" class="opacity-50" />
  </span>
</template>

<script>
export default {
  name: 'VImage',
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '100px',
    },
    src: {
      type: String,
      default: null,
      required: true,
    },
  },
  data: () => ({
    ready: false,
  }),
  mounted() {
    const buffer = new Image()
    buffer.onload = () => (this.ready = true)
    buffer.src = this.src
  },
}
</script>
