<template>
  <BaseButton
    class="
      font-semibold
      text-sm text-white
      whitespace-nowrap
      active:shadow-none
      shadow-sm
      uppercase
      transition-all
      duration-500
      tracking-wider
      leading-none
      px-6
      h-12
      rounded-xl
    "
    :class="{
      'bg-primary-400 ring-primary-900': props.primary,
      'bg-red-400 hover:bg-red-400 ring-red-900': props.red,
      'bg-green-400 hover:bg-green-400 ring-green-900': props.green,
      'bg-yellow-400 ring-yellow-900': props.yellow,
      'bg-light-900 text-light-50 dark:bg-dark-400 text-black': disabled,
    }"
    :disabled="props.disabled"
    v-bind="attrs"
  >
    <slot />
  </BaseButton>
</template>

<style scoped>
.squircle {
  -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="100%25" width="100%25"><mask id="squircle"><rect fill="white" width="100%25" height="100%25"/><svg x="-.01%25" style="overflow: visible"><path fill="black" width="20" height="20" d="M20 0H0v20C0 4 4 0 20 0z"/></svg><svg x="100.01%25" style="overflow: visible"><path fill="black" d="M20 20V0H0c16 0 20 4 20 20z" transform="translate(-20,0)"/></svg><svg x="100.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 20h20V0c0 16-4 20-20 20z" transform="translate(-20,-20)"/></svg><svg x="-.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 0v20h20C4 20 0 16 0 0z" transform="translate(0,-20)"/></svg></mask><rect fill="white" width="100%25" height="100%25" mask="url(%23squircle)"/></svg>');
  mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="100%25" width="100%25"><mask id="squircle"><rect fill="white" width="100%25" height="100%25"/><svg x="-.01%25" style="overflow: visible"><path fill="black" width="20" height="20" d="M20 0H0v20C0 4 4 0 20 0z"/></svg><svg x="100.01%25" style="overflow: visible"><path fill="black" d="M20 20V0H0c16 0 20 4 20 20z" transform="translate(-20,0)"/></svg><svg x="100.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 20h20V0c0 16-4 20-20 20z" transform="translate(-20,-20)"/></svg><svg x="-.01%25" y="100.01%25" style="overflow: visible"><path fill="black" d="M0 0v20h20C4 20 0 16 0 0z" transform="translate(0,-20)"/></svg></mask><rect fill="white" width="100%25" height="100%25" mask="url(%23squircle)"/></svg>');
}
</style>

<script setup>
import { defineProps, useAttrs } from 'vue'

const attrs = useAttrs()
const props = defineProps({
  primary: { type: Boolean, default: true },
  red: { type: Boolean, default: false },
  green: { type: Boolean, default: false },
  yellow: { type: Boolean, default: false },
  disabled: Boolean,
})
</script>
