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

  console.log(token);

  if (!token && !refreshToken) return createError('Corrupted auth')
  // if refresh token exist try to restore
  if (!token && refreshToken) return tryRestore()

  return new Promise((resolve, reject) => store
    .dispatch('auth/checkToken', token)
    .then(resolve)
    // finally try to refresh
    .catch(err => tryRestore()
      .then(resolve)
      .catch(() => createError('Corrupted auth'))
    ))

}
