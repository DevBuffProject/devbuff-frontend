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

    // commit('setHealth', data, { root: true })

    console.log('[ FETCH STATUS ]: statuspage request ', data, `${STATUSPAGE_BASE_URL}/status.json`);

    // return data
  },
  async nuxtServerInit({ commit, dispatch }, { $cookies, $api, error }) {
    await dispatch('getHealth', null, { root: true })

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
