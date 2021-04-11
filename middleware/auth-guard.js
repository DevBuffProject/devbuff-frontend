export default async ({ store, req, error }) => {
  const token = store.getters['session/token']
  const refreshToken = store.getters['session/refreshToken']
  const createError = (message) =>
    error({
      statusCode: 401,
      message,
    })

  if (!token && !refreshToken) {
    return createError('Corrupted auth: no credentials')
  }

  try {
    await store.dispatch('auth/checkToken', token)
    await store.dispatch('user/getProfile')
  } catch (e) {
    try {
      // if refresh token failure > user not authorized
      await store.dispatch('auth/getToken', {
        grant: refreshToken,
        refresh: true,
      })
      await store.dispatch('user/getProfile')
    } catch (e) {
      return createError('Corrupted auth: invalid tokens')
    }
  }
}
