export default (
  { $loading, $cookies, $config, $axios, store, error },
  inject
) => {
  const { API_BASE_URL, VK_PROXY_PATH } = $config
  const cookies = $cookies
  const token = cookies.get('remix_token')
  const createApiInstance = (baseURL = null) => {
    const axios = $axios.create()

    if (baseURL) axios.setBaseURL(baseURL)
    // eject data
    axios.onResponse((response) => response.data)
    return axios
  }

  let latest

  const v1 = (latest = createApiInstance(API_BASE_URL))
  const root = { v1, latest, ...createApiInstance() }
  v1.setToken(token, 'Bearer')

  const vkdata = createApiInstance(VK_PROXY_PATH)

  // Inject to context as $api
  inject('api', { ...root, vkdata })
}
