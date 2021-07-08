<template>
  <div
    class="relative rounded-full overflow-hidden border border-secondary p-0.5"
  >
    <div
      :key="random"
      class="
        bg-cover
        flex
        items-center
        justify-center
        rounded-full
        bg-white
        dark:bg-blueGray-900
        border border-gray-200
        dark:border-blueGray-800
        h-full
        w-full,
        relative
        z-10
      "
      :style="{
        backgroundImage: `url(${avatar}?${random})`,
        width: size,
        height: size,
        flex: `0 0 ${size}`,
      }"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AtomicAvatar',
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
  setup() {
    const random = computed(() => Math.ceil(Math.random() * 1000))
    return { random }
  },
})
</script>
