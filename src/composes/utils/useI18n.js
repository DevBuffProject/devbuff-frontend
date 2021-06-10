import { useI18n as i18n } from 'vue-i18n'

export const useI18n = (basePath) => {
  const { t: _t } = i18n()
  const t = (path) => {
    return _t(basePath + '.' + path)
  }

  return {
    t,
  }
}
