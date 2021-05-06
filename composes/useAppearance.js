import { useContext, computed } from '@nuxtjs/composition-api'

export const useAppearance = () => {
  const { $colorMode } = useContext()
  const DARK = 'dark'
  const LIGHT = 'light'
  const isDarkMode = computed(() => $colorMode.preference === DARK)
  const isLightMode = computed(() => $colorMode.preference === LIGHT)
  const setColorScheme = (theme) => ($colorMode.preference = theme)
  const toggleColorScheme = () =>
    setColorScheme(isDarkMode.value ? LIGHT : DARK)

  return {
    DARK,
    LIGHT,
    isDarkMode,
    isLightMode,
    setColorScheme,
    toggleColorScheme,
  }
}
