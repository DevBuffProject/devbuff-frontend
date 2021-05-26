import qs from 'query-string'

const options = {
  arrayFormat: 'comma',
}

const parse = (str) => qs.parse(str, options)
const stringify = (obj) => qs.stringify(obj, options)

export const useQueryString = () => {
  return {
    parse,
    stringify,
  }
}
