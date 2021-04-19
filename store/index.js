export const state = () => ({
  health: {},
})

export const mutations = {
  setHealth: (state, health) => (state.health = health),
}

export const actions = {
  async getHealth({ commit }) {
    const { STATUSPAGE_BASE_URL } = this.$config
    const { data } = await this.$axios.get(`${STATUSPAGE_BASE_URL}/status.json`)
    commit('setHealth', data, { root: true })
    return data
  },
  async nuxtServerInit({ commit, dispatch }, { $config, $cookies }) {
    const { SESSION_COOKIE_KEY } = $config
    const cookieSession = $cookies.get(SESSION_COOKIE_KEY)
    const token = cookieSession?.session.auth.token

    this.$api.latest.setToken(token, 'Bearer')

    if (cookieSession) commit('session/setSession', cookieSession)

    if (token) {
      try {
        await dispatch('session/checkToken', token)
        await dispatch('user/getProfile')
      } catch (e) {}
    }
  },
}

export const getters = {
  health: (state) => state.health,
}
