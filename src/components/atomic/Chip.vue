<template>
  <span
    :class="{
      'text-xs px-4 py-1 font-medium uppercase rounded-full': true,
      'bg-gray-200 dark:bg-dark-300 text-dark-50 dark:text-warmGray-300':
        type !== 'auto',
    }"
    :style="
      type !== 'auto'
        ? {}
        : {
            backgroundColor: colors.bg,
            color: colors.text,
          }
    "
  >
    {{ text }}
  </span>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useColor } from '../../composes'

const props = defineProps({
  text: { type: String, default: '' },
  type: { type: String, default: '' },
})

const { color } = useColor(props.text)
const colors = computed(() => ({
  bg: color.fade(0.7),
  text: color.darken(0.2),
}))
</script>
