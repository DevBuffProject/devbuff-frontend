<template>
  <button
    v-ripple="rippleColor"
    v-bind="attrs"
    class="text-center flex items-center transition-all"
    :class="{
      'transform active:scale-90 duration-200 ease-in-out': !disabled,
      'pointer-events-none': disabled,
    }"
    :disabled="disabled"
    @mousedown="activeState = true"
    @mouseout="activeState = false"
    @touchstart="activeState = true"
  >
    <slot />
  </button>
</template>

<script setup>
import { ref, useAttrs, defineProps, toRefs } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  rippleColor: { type: String, default: 'rgba(255, 255, 255, .3)' },
})
const { disabled, rippleColor } = toRefs(props)

const attrs = useAttrs()
const activeState = ref(false)
</script>
