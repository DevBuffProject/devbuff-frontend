import { useI18n as i18n } from 'vue-i18n'

export const useI18n = (basePath) => {
  const { t: _t } = i18n()
  const t = (path, ignorePath = false) => {
    const prefixKey = ignorePath ? '' : basePath + '.'
    return _t(prefixKey + path)
  }

  return {
    t,
  }
}
