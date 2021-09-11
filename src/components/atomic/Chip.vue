<template>
  <span
    :class="{
      'bg-light-900 dark:bg-dark-300 text-black dark:text-white dark:text-opacity-50 text-opacity-50':
        type !== 'auto',
      'border -m-px': type === 'auto',
    }"
    class="text-xs px-4 py-px font-light rounded-full"
    :style="type === 'auto' && colors"
    v-text="text"
  ></span>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useColor } from '../../composes'

export default defineComponent({
  name: 'AtomicChip',
  props: {
    text: { type: String, default: '' },
    type: { type: String, default: '' },
  },
  setup(props) {
    const colors = computed(() => {
      const bg = useColor(props.text).color
      bg.alpha = 0.15
      bg.chroma = 100

      const textColor = useColor(props.text).color
      textColor.chroma = 100
      textColor.lightness = 50

      const borderColor = useColor(props.text).color
      borderColor.alpha = 0.17
      borderColor.chroma = 100

      return {
        backgroundColor: bg,
        color: textColor,
        borderColor,
      }
    })

    return {
      colors,
    }
  },
})
</script>
