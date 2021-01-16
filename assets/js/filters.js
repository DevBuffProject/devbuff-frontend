export const toLocaleDateTime = (dateString, locale = 'en-US') => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return new Intl.DateTimeFormat(locale, options).format(date)
}

export default {
  toLocaleDateTime,
  install: Vue => {
    Vue.filter('toLocaleDateTime', toLocaleDateTime)
  }
}
