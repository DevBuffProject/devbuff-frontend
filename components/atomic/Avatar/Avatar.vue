<template>
  <div
    :class="[
      'bg-cover flex items-center justify-center',
      'bg-white dark:bg-blueGray-900',
      'border border-gray-200 dark:border-blueGray-800',
      square ? 'rounded' : 'rounded-full',
    ]"
    :style="{
      backgroundImage: `url(${url})`,
      width: size,
      height: size,
      flex: `0 0 ${size}`,
    }"
  />
</template>

<script>
export default {
  name: 'VAvatar',
  props: {
    avatar: {
      type: String,
      default: null,
    },
    square: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '40px',
    },
  },
  computed: {
    url() {
      return `${this.$config.API_BASE_URL}/photo/profile/${this.avatar}`
    },
  },
}
</script>
