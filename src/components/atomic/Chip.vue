<template>
  <span
    class="text-xs px-4 py-px font-light rounded-full"
    :class="{
      'bg-gray-200 dark:bg-dark-500 text-dark-50 dark:text-dark-50':
        type !== 'auto',
    }"
    :style="
      type === 'auto' && {
        backgroundColor: colors.bg,
        color: colors.text,
      }
    "
  >
    <strong>{{ text }}</strong>
  </span>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useColor } from '../../composes/utils'

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
  setup(props) {
    const { color } = useColor(props.text)
    const colors = computed(() => ({
      bg: color.fade(0.8),
      text: color.darken(0.1),
    }))

    return { colors }
  },
})
</script>
