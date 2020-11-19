export default function ({
  $loading,
  $cookies,
  $config,
  $axios,
  store,
  error
}, inject) {
  const { API_BASE_URL } = $config
  const cookies = $cookies
  const token = cookies.get('remix_token')

  const createError = err => {
    const errMessage = {
      statusCode: err.response ? err.response.status : 500,
      message: err.response ? err.response.data : err.message
    }
    // return error(errMessage)
    console.error(errMessage)
  }

  const v1 = $axios.create()

  v1.setBaseURL(API_BASE_URL)
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
