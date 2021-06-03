export const state = () => ({
  health: {}
})

export const mutations = {
  setHealth: (state, health) => state.health = health,
}

export const actions = {
  async getHealth({ commit, state }) {
    const { STATUSPAGE_BASE_URL } = this.$config
    const { data } = await this.$axios.get(`${STATUSPAGE_BASE_URL}/status.json`)

    commit('setHealth', data, { root: true })

    return data
  },
  async nuxtServerInit({ commit, dispatch }, { $cookies, $api, error }) {
    const token = $cookies.get('remix_token')
    const refreshToken = $cookies.get('remix_refresh_token')

    if (token && refreshToken) {
      $api.latest.setToken(token, 'Bearer')

      commit('auth/setToken', token)
      commit('auth/setRefreshToken', refreshToken)
    }
  }
}

export const getters = {
  health: state => state.health
}