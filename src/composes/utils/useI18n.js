import { useI18n as i18n } from 'vue-i18n'

export const useI18n = (basePath) => {
  const { t: _t, te: _te } = i18n()
  const t = (path = '', ignoreBasePath = false) => {
    const prefixKey = ignoreBasePath ? '' : basePath + '.'
    return _t(prefixKey + path)
  }

  const tDefault = (path, fallbackStr, ignoreBasePath = false) => {
    const prefixKey = ignoreBasePath ? '' : basePath + '.'
    return _t && _te
      ? _te(prefixKey + path)
        ? _t(prefixKey + path)
        : fallbackStr
      : fallbackStr
      ? fallbackStr
      : prefixKey + path
  }

  return {
    t,
    tDefault,
  }
}
