import Cookies from 'universal-cookie'

export const state = () => ({
  _session: {
  },

  _shared: {
    colors: 'light'
  }
})

export const mutations = {

}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, $api, error }) {
    const cookies = new Cookies(req.headers.cookie)
    const token = cookies.get('remix_token')
    const refreshToken = cookies.get('remix_refresh_token')
    const { APP_KEY } = this.$config

    if (token && refreshToken) {
      $api.v1.setToken(token, 'Bearer')

      commit('auth/setToken', token)
      commit('auth/setRefreshToken', refreshToken)

      await dispatch('user/getProfile')
    }

    // Promise.all([
    //   // ... common server actions
    // ])
  }
}

export const getters = {
}
