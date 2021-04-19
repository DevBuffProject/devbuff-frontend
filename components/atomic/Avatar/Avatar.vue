<template>
  <div class="relative rounded-full overflow-hidden" style="padding: 1px">
    <div
      :key="random"
      :class="[
        'bg-cover flex items-center justify-center rounded-full',
        'bg-white dark:bg-blueGray-900',
        'border border-gray-200 dark:border-blueGray-800',
        'h-full w-full, relative z-10',
      ]"
      :style="{
        backgroundImage: `url(${avatar}?${random})`,
        minWidth: size,
        minHeight: size,
      }"
    />
    <em
      v-if="gradientBorder"
      class="w-full h-full absolute top-0 left-0 bg-gradient-to-br gradientLaguna"
    />
  </div>
</template>

<script>
export default {
  name: 'VAvatar',
  props: {
    avatar: {
      type: String,
      default: null,
    },
    gradientBorder: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '40px',
    },
  },
  computed: {
    random() {
      return Math.ceil(Math.random() * 1000)
    },
  },
}
</script>
