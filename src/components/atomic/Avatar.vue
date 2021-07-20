<template>
  <div class="relative rounded-full overflow-hidden">
    <div
      class="
        bg-cover
        flex
        items-center
        justify-center
        rounded-full
        bg-white
        h-full
        w-full,
        relative
        z-10
      "
      :style="{
        backgroundImage: `url(${src})`,
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
    src: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: '40px',
    },
  },
  setup() {},
})
</script>
