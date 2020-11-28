export default ({ $loading, $cookies, $config, $axios, store, error }, inject) => {
  const { API_BASE_URL } = $config
  const cookies = $cookies
  const token = cookies.get('remix_token')
  const createError = err => {
    const errMessage = {
      statusCode: err.response ? err.response.status : 500,
      message: err.response ? err.response.data : err.message
    }
    console.error(errMessage)
  }
  const createApiInstance = (baseURL = null) => {
    const axios = $axios.create()

    if (baseURL) axios.setBaseURL(baseURL)
    axios.setToken(token, 'Bearer')

    // eject data
    axios.onResponse(response => response.data)
    axios.onError(createError)
    axios.onResponseError(createError)
    axios.onRequestError(createError)

    return axios
  }

  const latest = createApiInstance(API_BASE_URL)
  const latestProxy = createApiInstance()

  const v1 = latest

  // Inject to context as $api
  inject('api', { v1, latest, ...latestProxy })
}
