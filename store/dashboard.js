export const state = () => ({
  ideas: [],
  pendingUsers: [],
})

export const mutations = {
  setIdeas: (state, list) => (state.ideas = list),
  setPendingUsers: (state, pendingUsers) => (state.pendingUsers = pendingUsers),
}

export const actions = {
  async getPendingUsers({ commit }, ideaId) {
    const pendingUsers = await this.$api.latest.get(`idea/pending/${ideaId}`)
    commit('setPendingUsers', pendingUsers)
    return pendingUsers
  },
  async getIdeas({ commit }) {
    const ideas = await this.$api.latest.get('/idea/self')
    commit('setIdeas', ideas)
    return ideas
  },
}

export const getters = {
  ideas: (state) => state.ideas,
  pendingUsers: (state) => state.pendingUsers,
}
