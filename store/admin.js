export const state = () => ({
  pendingIdeas: []
})

export const mutations = {
  setPendingIdeas: (state, ideas) => state.pendingIdeas = ideas
}

export const actions = {
  async getPendingIdeas({ commit }) {
    const ideas = await this.$api.latest.get('idea/moderator/waitingIdea')

    commit('setPendingIdeas', ideas)

    return ideas
  },

  async aprooveIdea(ctx, id) {
    return await this.$api.latest.get(`idea/moderator/submit/${id}`)
  },

  async deleteIdea(ctx, id) {
    return await this.$api.latest.get(`idea/moderator/delete/${id}`)
  }
}

export const getters = {
  pendingIdeas: state => state.pendingIdeas,
}

export default {
  state,
  mutations,
  actions,
  getters
}
