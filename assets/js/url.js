import queryString from 'query-string'

const config = {
  arrayFormat: 'comma',
  skipEmptyString: true,
  skipNull: true,
}

export const qs = {
  stringify(object) {
    return queryString.stringify(object, config)
  },
  parse(object) {
    return queryString.parse(object, config)
  },
}
