import queryString from 'query-string'

const config = {
  arrayFormat: 'comma',
  skipEmptyString: true,
  skipNull: true,
}

export const stringify = (object) => queryString.stringify(object, config)

export const parse = (string) => queryString.parse(string, config)

export const fromRoute = ({ fullPath }) => {
  if (!fullPath) throw new Error('Invalid route for parse')
  return parse(fullPath.split('?')[1])
}

export default {
  stringify,
  parse,
  fromRoute,
}
