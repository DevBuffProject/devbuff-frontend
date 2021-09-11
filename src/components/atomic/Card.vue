<template>
  <div
    class="
      shadow-lg shadow-dark-50
      dark:shadow-black dark:shadow-3xl
      bg-white
      border border-default
      dark:bg-dark-800
      grid
      p-4
      rounded-xl
      relative
      break-all
    "
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, useAttrs, useSlots } from 'vue'
import { useAppearance } from '../../composes'

export default defineComponent({
  name: 'AtomicCard',
  props: {
    triangle: {
      type: String,
      default: '',
    },
  },
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    const { isDark } = useAppearance()

    return {
      isDark,
      attrs,
      slots,
    }
  },
})
</script>
