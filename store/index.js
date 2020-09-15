import Cookies from 'universal-cookie'

export const state = () => ({
  loaded: false,
  pageName: null,

  _session: {
  },

  _shared: {
    colors: 'light'
  }
})

export const mutations = {
  setPageName: (state, name) => state.pageName = name
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req, $api, error }) {
    const cookies = new Cookies(req.headers.cookie)
    const token = cookies.get('remix_token')
    const refreshToken = cookies.get('remix_refresh_token')
    const { APP_KEY } = this.$config

    if (token && refreshToken) {
      commit('auth/setToken', token)
      commit('auth/setRefreshToken', refreshToken)

      dispatch('user/getProfile')
        .catch(error => error({ statusCode: 500, message: error }))
    }

    // Promise.all([
    //   // ... common server actions
    // ])
  }
}

export const getters = {
  pageName: state => state.pageName
}
