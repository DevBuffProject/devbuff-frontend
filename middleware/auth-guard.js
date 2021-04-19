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
  } catch (e) {
    try {
      await store.dispatch('auth/getToken', {
        grant: refreshToken,
        refresh: true,
      })
    } catch (e) {
      return createError('Corrupted auth: invalid tokens')
    }
  }
}
