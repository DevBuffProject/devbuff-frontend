import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const isLight = computed(() => !isDark.value)
const toggleDark = useToggle(isDark)

export const useAppearance = () => ({
  isDark,
  isLight,
  toggleDark,
})
