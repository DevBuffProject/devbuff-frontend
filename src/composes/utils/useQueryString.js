import qs from 'query-string'

const options = {
  arrayFormat: 'comma',
}

export const useQueryString = () => ({
  parse: (str) => qs.parse(str, options),
  stringify: (obj) => qs.stringify(obj, options),
})
