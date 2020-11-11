export const state = () => ({
  _session: {
  },

  _shared: {
    colors: 'light'
  }
})

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { $cookies, $api, error }) {
    const token = $cookies.get('remix_token')
    const refreshToken = $cookies.get('remix_refresh_token')
    const { APP_KEY } = this.$config

    if (token && refreshToken) {
      $api.v1.setToken(token, 'Bearer')

      commit('auth/setToken', token)
      commit('auth/setRefreshToken', refreshToken)

      // TODO: BUG - 401 because nuxtServerInit runs before middleware cheks
      // await dispatch('user/getProfile')
    }
  }
}
