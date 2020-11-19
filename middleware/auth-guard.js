export default async ({ store, req, error }) => {
  const token = store.getters['auth/token']
  const refreshToken = store.getters['auth/refreshToken']
  const createError = message => error({
    statusCode: 401,
    message
  })
  const tryRestore = () => store.dispatch('auth/getToken', {
    grant: refreshToken,
    refresh: true
  })

  if (!token && !refreshToken) return createError('Corrupted auth')
  // if refresh token exist try to restore
  if (!token && refreshToken) return tryRestore()

  return new Promise((resolve, reject) => store
    .dispatch('auth/checkToken', token)
    .then(resolve)
    .then(() => store.dispatch('user/getProfile'))
    // finally try to refresh
    .catch(err => tryRestore()
      .then(resolve)
      .catch(() => createError('Corrupted auth'))
    ))

}
