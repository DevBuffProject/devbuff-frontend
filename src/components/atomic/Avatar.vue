<template>
  <AtomicSquircle :width="size" :height="size" :roundness="1">
    <div
      class="
        bg-cover
        flex
        items-center
        justify-center
        bg-white
        h-full
        w-full,
        relative
        z-10
      "
      :style="{
        backgroundImage: `url(${src})`,
        width: `${size}px`,
        height: `${size}px`,
        flex: `0 0 ${size}`,
      }"
    />
  </AtomicSquircle>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  src: { type: String, default: null },
  size: { type: Number, default: 40 },
})
</script>
