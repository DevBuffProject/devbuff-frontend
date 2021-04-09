import { qs } from '~/assets/js/url'

export const state = () => ({
  list: [],
  idea: {},
  statusPositions: [],
  pendingUsers: [],
})

export const mutations = {
  setIdeas: (state, list) => (state.list = list),
  setIdea: (state, idea) => (state.idea = idea),
  setPendingUsers: (state, pendingUsers) => (state.pendingUsers = pendingUsers),
  setStatusPositions: (state, statusPositions) =>
    (state.statusPositions = statusPositions),
}

export const actions = {
  async getPendingUsers({ commit }, ideaId) {
    const pendingUsers = await this.$api.latest.get(`idea/pending/${ideaId}`)
    commit('setPendingUsers', pendingUsers)
    return pendingUsers
  },
  async getStatusPositions({ commit }, ideaId) {
    const statusPositions = await this.$api.latest.get(
      `idea/${ideaId}/statusPositions`
    )
    commit('setStatusPositions', statusPositions)
    return statusPositions
  },
  async respondPosition(ctx, { idea, position }) {
    return await this.$api.latest.put(`idea/join/${idea}/${position}`)
  },
  async appendIdea(ctx, data) {
    return await this.$api.latest.post('idea', { ...data })
  },
  async updateIdea(ctx, { id, data }) {
    return await this.$api.latest.put(`idea/${id}`, data)
  },
  async deleteIdea(ctx, id) {
    return await this.$api.latest.delete(`idea/${id}`)
  },
  async getIdeas({ commit, state }, params) {
    const finalParams = { page: 1, sortBy: 'date', ...params }
    const query = qs.stringify(finalParams)
    const ideas = await this.$api.latest.get(['/idea/', query].join('?'))
    commit('setIdeas', ideas)
    return ideas
  },
  async getIdea({ commit }, uuid) {
    const idea = await this.$api.latest.get(`/idea/${uuid}`)
    commit('setIdea', idea)
    return idea
  },
}

export const getters = {
  list: (state) => state.list,
  idea: (state) => state.idea,
  statusPositions: (state) => state.statusPositions,
  isUserResponded: (state) => (specializationId) => {
    const pos = state.statusPositions.find(
      (s) => s.specializationId === specializationId
    )
    return pos.positionStatus === 'PENDING'
  },
}
