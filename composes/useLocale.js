import { useContext, computed } from '@nuxtjs/composition-api'

export const useLocale = () => {
  const { i18n, localePath } = useContext()
  const locale = computed(() => i18n.locale)
  const locales = computed(() => i18n.locales)
  const setLocale = async (locale) => await i18n.setLocale(locale)
  const t = (strings) =>
    strings[0]
      .split(' ')
      .map((str) => i18n.t(str.trim()))
      .join(' ')
      .trim()

  return {
    t,
    i18n,
    locale,
    locales,
    localePath,
    setLocale,
  }
}
