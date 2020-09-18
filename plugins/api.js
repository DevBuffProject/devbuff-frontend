import Cookies from 'universal-cookie'

export default function ({ req, $config, $axios, store, error }, inject) {
  const { API_BASE_PROXY_URL, API_BASE_URL } = $config
  const cookies = new Cookies(process.server && req.headers.cookie)
  const token = cookies.get('remix_token')
  const baseUrl = process.client
    ? `${API_BASE_PROXY_URL}/v1/`
    : API_BASE_URL

  const createError = err => error({
    statusCode: err.statusCode,
    message: err
  })

  const v1 = $axios.create()
  v1.setBaseURL(baseUrl)
  v1.setToken(token, 'Bearer')
  // eject data
  v1.onResponse(response => response.data)
  v1.onError(createError)
  v1.onResponseError(createError)
  v1.onRequestError(createError)

  const api = {
    v1
  }

  // Inject to context as $api
  inject('api', api)
}
