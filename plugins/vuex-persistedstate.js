// import createPersistedState from 'vuex-persistedstate'
//
// export default ({ store, $cookies, $config }) => {
//   const now = new Date()
//   const yearExp = new Date(now.setFullYear(now.getFullYear() + 1))
//
//   const cookieStorage = {
//     getItem: (key) => $cookies.get(key),
//     setItem: (key, value) =>
//       $cookies.set(key, value, {
//         expires: yearExp,
//         path: '/',
//       }),
//     removeItem: (key) => $cookies.remove(key),
//   }
//
//   createPersistedState({
//     key: $config.SESSION_COOKIE_KEY,
//     paths: ['session'],
//     storage: cookieStorage,
//     getState: cookieStorage.getItem,
//     setState: cookieStorage.setItem,
//   })(store)
// }

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req, $config }) => {
  createPersistedState({
    key: $config.SESSION_COOKIE_KEY,
    paths: ['session'],
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie)
          return parsedCookies[key]
        } else {
          return Cookies.get(key)
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
