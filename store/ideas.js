export const state = () => ({
  list: [],
  own: [],
  idea: {},
})

export const mutations = {
  setIdeas: (state, list) => state.list = list,
  setOwnIdeas: (state, list) => state.own = list,
  setIdea: (state, idea) => state.idea = idea
}

export const actions = {
  async getOwnIdeas({ commit, state }) {
    const ideas = await this.$api.v1.get('/idea/self')
    commit('setOwnIdeas', ideas)

    return ideas
  },
  async getIdeas({ commit, state }, params) {
    const finalParams = {
      page: 1,
      sortBy: 'date',
      ...params
    }

    const query = new URLSearchParams
    Object.keys(finalParams).forEach(param => query.append(param, finalParams[param]));

    const ideas = await this.$api.v1.get(`/idea/?${query}`)
    commit('setIdeas', new Set([ ...state.list, ...ideas ]))

    return ideas
  },
  async getIdea({ commit }, uuid) {
    const idea = await this.$api.v1.get(`/idea/${uuid}`)
    commit('setIdea', idea)

    return idea
  }
}

export const getters = {
  list: state => state.list,
  own: state => state.own,
  idea: state => state.idea
}
