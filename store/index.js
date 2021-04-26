export const state = () => ({
  health: {},
  error: {},
})

export const mutations = {
  setHealth: (state, health) => (state.health = health),
  setError: (state, error) => (state.error = error),
}

export const actions = {
  async getHealth({ commit }) {
    const { STATUSPAGE_BASE_URL } = this.$config
    const { data } = await this.$axios.get(`${STATUSPAGE_BASE_URL}/status.json`)
    commit('setHealth', data, { root: true })
    return data
  },
}

export const getters = {
  health: (state) => state.health,
  error: (state) => state.error,
}
