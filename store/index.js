export const actions = {
  async nuxtServerInit({ commit, dispatch }, { $cookies, $api, error }) {
    const token = $cookies.get('remix_token')
    const refreshToken = $cookies.get('remix_refresh_token')

    if (token && refreshToken) {
      $api.v1.setToken(token, 'Bearer')

      commit('auth/setToken', token)
      commit('auth/setRefreshToken', refreshToken)
    }
  }
}
