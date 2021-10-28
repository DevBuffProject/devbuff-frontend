<template>
  <div
    class="squircle"
    :style="{ width: `${w}px`, height: `${h}px`, 'background-image': bgImage }"
  >
    {{ w }}
<!--    <slot />-->
  </div>
</template>

<style scoped>
.squircle {
  color: #333844aa;
  font-weight: 800;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
}
</style>

<script setup>
import { computed, defineProps, toRefs } from "vue";

const props = defineProps({
  width: { type: Number, default: 100 },
  height: { type: Number },
  roundness: { type: Number, default: 1 },
  color: { type: String, default: "#7788aa" }
})
const { width, height, roundness, color } = toRefs(props)
const w = computed(() => width.value)
const h = computed(() => height.value)
const path = computed(() => {
  const w = w.value;
  const h = h.value;
  let wm = w * ( h / w );
  let r = -( w / 20 ) + ( w / 10 * roundness.value );
  let path = `
      M ${w/2},0
      C ${r},0      0,${r}        0,${wm/2}
      0,${wm-r}     ${r},${wm}    ${w/2},${wm}
      ${w-r},${wm}  ${w},${wm-r}  ${w},${wm/2}
      ${w},${r}     ${w-r},0      ${w/2},0
  `;
  return path.replace( /  +/g, " " ).replace( /\n/gi,"" );
})
const svg = computed(() => `<svg xmlns='http://www.w3.org/2000/svg'><path d='${path.value}' fill='${color.value}'></path></svg>`.replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E");)
const bgImage = computed(() => `url("data:image/svg+xml;utf8,${this.svg}")`)
</script>
