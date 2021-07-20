<template>
  <div
    v-if="visible"
    class="
      fixed
      z-50
      top-0
      left-0
      w-screen
      h-screen
      flex
      bg-black
      items-center
      justify-center
    "
  >
    <div
      class="relative z-50 w-full h-auto max-h-screen"
      style="overflow: auto; overflow: overlay"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'AtomicOverlay',
  props: {
    visible: { type: Boolean, default: false },
    hideControls: { type: Boolean, default: false },
  },
  setup() {
    const rooElement = window.document.documentElement
    const { overflow } = window.getComputedStyle(rooElement)
    onMounted(() => (rooElement.style.overflow = 'hidden'))
    onUnmounted(() => (rooElement.style.overflow = overflow))
  },
})
</script>
