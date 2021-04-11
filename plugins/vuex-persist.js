import createPersistedState from 'vuex-persistedstate'

export default ({ store, $cookies, $config }) => {
  const now = new Date()
  const yearExp = new Date(now.setFullYear(now.getFullYear() + 1))

  const cookieStorage = {
    getItem: (key) => $cookies.get(key),
    setItem: (key, value) =>
      $cookies.set(key, value, {
        expires: yearExp,
        path: '/',
      }),
    removeItem: (key) => $cookies.remove(key),
  }

  createPersistedState({
    key: $config.SESSION_COOKIE_KEY,
    paths: ['session'],
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem,
  })(store)
}
