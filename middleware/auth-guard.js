export default async ({ store, req, error }) => {
  const token = store.getters['auth/token']
  const refreshToken = store.getters['auth/refreshToken']
  const createError = message => error({
    statusCode: 401,
    message
  })

  if (!token && !refreshToken) return createError('Corrupted auth: no credentials')

  try {
    // if refresh token failure > user not authorized
    await store.dispatch('auth/getToken', {
      grant: refreshToken,
      refresh: true
    })
    await store.dispatch('user/getProfile')
  } catch (e) {
    return createError('Corrupted auth: invalid tokens')
  }
}
