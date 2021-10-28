<template>
  <div
    v-if="props.visible"
    class="
      fixed
      z-50
      top-0
      left-0
      w-screen
      h-screen
      flex
      items-center
      justify-center
      bg-black bg-opacity-40
      dark:bg-opacity-90
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

<script setup>
import { defineProps, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
})

const rooElement = window.document.documentElement
const { overflow } = window.getComputedStyle(rooElement)
onMounted(() => (rooElement.style.overflow = 'hidden'))
onUnmounted(() => (rooElement.style.overflow = overflow))
</script>
