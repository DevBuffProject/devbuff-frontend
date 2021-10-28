<template>
  <button
    v-bind="attrs"
    class="text-center flex items-center transition-all"
    :class="{
      'transform active:scale-95 duration-250 ease-in-out': !props.disabled,
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
import { ref, useAttrs, defineProps } from 'vue'

const props = defineProps({
  disabled: Boolean,
})
const attrs = useAttrs()
const activeState = ref(false)
</script>
