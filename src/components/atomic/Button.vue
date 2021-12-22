<template>
  <button
    v-ripple
    class="
      font-semibold
      text-sm text-white
      whitespace-nowrap
      uppercase
      transition-all transition-rounded
      duration-200
      tracking-wider
      leading-none
      px-6
      flex
      items-center
      shadow-sm
      hover:shadow-lg
      active:shadow-sm
    "
    :class="{
      'h-12': !(dense && narrow),
      'h-10': dense,
      'h-8': narrow,

      'rounded-full': rounded,
      'rounded-xl': !rounded || tile,
      'opacity-0': invisible,

      'bg-primary-400 active:bg-primary-500': primary,
      'bg-red-400 active:bg-red-500': red,
      'bg-green-400 active:bg-green-500': green,
      'bg-yellow-400 active:bg-yellow-500': yellow,
      'bg-light-900 text-light-50 dark:bg-dark-400 text-black': disabled,
    }"
    :disabled="disabled"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

defineProps({
  primary: { type: Boolean, default: true },
  red: { type: Boolean, default: false },
  green: { type: Boolean, default: false },
  yellow: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
  narrow: { type: Boolean, default: false },
  rounded: { type: Boolean, default: true },
  tile: { type: Boolean, default: false },
  invisible: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
</script>
