import Cookies from 'universal-cookie'

export default async ({ store, req, $api, $config, error }) => {
  const cookies = new Cookies(process.server && req.headers.cookie)
  const token = cookies.get('remix_token')
  const refreshToken = cookies.get('remix_refresh_token')

  if (token && refreshToken) {
    const { API_BASE_URL } = $config

    const credentails = new URLSearchParams()
    credentails.set('token', token)

    return $api.v1
      .post(`oAuth/check`, credentails)
      .then(async ({ active }) => {
        if (!active) error({ statusCode: 401, message: 'Unauthorized' })
      })
      .catch(err => error({ statusCode: 500, message: err }))
  } else {
    error({ statusCode: 401, message: 'Unauthorized' })
  }
}
