export default ({ store, $cookies, $config, $axios }, inject) => {
  const {
    API_PROXY_ENABLED,
    API_PROXY_PATH,
    API_BASE_URL,
    VK_PROXY_ENABLED,
    VK_PROXY_PATH,
    VK_BASE_URL,
  } = $config
  const { accessToken, type } = store.getters['auth/tokens']
  const createApiInstance = (baseURL = null) => {
    const axios = $axios.create()
    if (baseURL) axios.setBaseURL(baseURL)
    axios.onResponse((response) => response.data)
    return axios
  }

  let latest
  const v1 = (latest = createApiInstance(
    process.client && API_PROXY_ENABLED ? API_PROXY_PATH : API_BASE_URL
  ))
  latest.setToken(accessToken, type)

  const root = { v1, latest, ...createApiInstance() }
  const vkdata = createApiInstance(
    process.client && VK_PROXY_ENABLED ? VK_PROXY_PATH : VK_BASE_URL
  )

  inject('api', { ...root, vkdata })
}
