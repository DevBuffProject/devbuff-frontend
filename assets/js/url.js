import queryString from 'query-string'

export const qs = {
  config: {
    arrayFormat: 'comma',
    skipEmptyString: true,
    skipNull: true,
  },

  stringify(object) {
    return queryString.stringify(object, this.config)
  },

  parse(object) {
    return queryString.parse(object, this.config)
  }
}
