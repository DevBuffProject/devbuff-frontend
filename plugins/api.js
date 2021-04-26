export default ({ $auth, $cookies, $config, $axios, error }, inject) => {
  const {
    API_PROXY_ENABLED,
    API_PROXY_PATH,
    API_BASE_URL,
    VK_PROXY_ENABLED,
    VK_PROXY_PATH,
    VK_BASE_URL,
  } = $config
  const createApiInstance = (baseURL = null) => {
    const axios = $axios.create()
    if (baseURL) axios.setBaseURL(baseURL)
    // eject data
    axios.onResponse((response) => response.data)
    return axios
  }

  let latest
  const v1 = (latest = createApiInstance(
    process.client && API_PROXY_ENABLED ? API_PROXY_PATH : API_BASE_URL
  ))
  const root = { v1, latest, ...createApiInstance() }
  const vkdata = createApiInstance(
    process.client && VK_PROXY_ENABLED ? VK_PROXY_PATH : VK_BASE_URL
  )

  $auth.strategy.token.sync()
  const [tokenType, token] = $auth.strategy.token.get()?.split(' ')
  if (token) {
    latest.setToken(token, tokenType)
  }

  // Inject to context as $api
  inject('api', { ...root, vkdata })
}
