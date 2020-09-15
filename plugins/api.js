import Cookies from 'universal-cookie'

export default function ({ req, $config, $axios, store }, inject) {
  const cookies = new Cookies(process.server && req.headers.cookie)
  const { API_BASE_PROXY_URL, API_BASE_URL } = $config
  const baseUrl = process.client
    ? `${API_BASE_PROXY_URL}/v1/`
    : API_BASE_URL

  const v1 = $axios.create()

  v1.setToken(cookies.get('remix_token'), 'Bearer')
  v1.setBaseURL(baseUrl)
  v1.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
  )

  const api = {
    v1
  }

  // Inject to context as $api
  inject('api', api)
}
