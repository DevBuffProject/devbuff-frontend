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
      break-words
    "
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, useAttrs, useCssModule, useSlots } from 'vue'
import { useAppearance } from '../../composes/utils'

export default defineComponent({
  name: 'AtomicCard',
  props: {
    triangle: {
      type: String,
      default: '',
    },
  },
  setup() {
    const styles = useCssModule()
    const attrs = useAttrs()
    const slots = useSlots()
    const { isDark } = useAppearance()

    return {
      styles,
      isDark,
      attrs,
      slots,
    }
  },
})
</script>
