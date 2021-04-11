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
    // https://github.com/championswimmer/vuex-persist#tips-for-nuxt
    const cookieSession = $cookies.get(SESSION_COOKIE_KEY)
    console.log(cookieSession)
    if (cookieSession) commit('session/setSession', cookieSession)
  },
}

export const getters = {
  health: (state) => state.health,
}
