<template>
  <span
    class="text-xs px-4 py-x font-light rounded bg-gray-200 text-gray-500 dark:bg-blueGray-700 text-blueGray-300"
    :style="
      type === 'auto' && {
        backgroundColor: colors.bg,
        color: colors.text,
      }
    "
  >
    {{ text }}
  </span>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useColors } from '../../../composes'

const { stringColor } = useColors()
const cachedColors = {}
const getTextBasedColors = (text) => {
  if (cachedColors[text]) return cachedColors[text]

  const colorInstance = stringColor(text)
  const colors = {
    text: colorInstance.luminate(0.1),
    bg: colorInstance.luminate(0.9),
  }

  return (cachedColors[text] = colors)
}

export default defineComponent({
  name: 'AtomicChip',
  props: {
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  setup({ text }) {
    const colors = computed(() => getTextBasedColors(text))

    return {
      colors,
    }
  },
})
</script>
