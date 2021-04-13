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
  nuxtServerInit({ commit }, { $config, $cookies }) {
    const { SESSION_COOKIE_KEY } = $config
    const cookieSession = $cookies.get(SESSION_COOKIE_KEY)
    const token = cookieSession?.session.auth.token
    this.$api.latest.setToken(token, 'Bearer')
    if (cookieSession) commit('session/setSession', cookieSession)
  },
}

export const getters = {
  health: (state) => state.health,
}
