<template>
  <div
    class="inline-flex justify-center items-center overflow-hidden"
    :style="styles"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, defineProps, toRefs } from 'vue'

const props = defineProps({
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },
  roundness: { type: Number, default: 1 },
  color: { type: String, default: '' },
  background: { type: Boolean, default: false },
  mask: { type: Boolean, default: true },
})
const { width, height, roundness, color, background, mask } = toRefs(props)

const path = computed(() => {
  const w = width.value
  const h = height.value
  const wm = w * (h / w)
  const r = -(w / 20) + (w / 10) * roundness.value
  const p = `
      M ${w / 2},0
      C ${r},0      0,${r}        0,${wm / 2}
      0,${wm - r}     ${r},${wm}    ${w / 2},${wm}
      ${w - r},${wm}  ${w},${wm - r}  ${w},${wm / 2}
      ${w},${r}     ${w - r},0      ${w / 2},0
  `
  return p.replace(/  +/g, ' ').replace(/\n/gi, '')
})
const svg = computed(() =>
  `<svg xmlns='http://www.w3.org/2000/svg'><path d='${path.value}' fill='${color.value}'></path></svg>`
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E'),
)
const bgImage = computed(() => `url("data:image/svg+xml;utf8,${svg.value}")`)
const styles = computed(() => {
  const size = { width: `${width.value}px`, height: `${height.value}px` }
  return background.value
    ? { ...size, backgroundImage: bgImage.value }
    : mask.value
    ? { ...size, maskImage: bgImage.value }
    : size
})
</script>
