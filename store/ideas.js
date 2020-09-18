export const state = () => ({
  list: [],
  own: []
})

export const mutations = {
  setIdeas: (state, list) => state.list = list,
  setOwnIdeas: (state, list) => state.own = list
}

export const actions = {
  getOwnIdeas({ commit }) {
    return this.$api.v1
      .get('/idea/self')
      .then(ideas => commit('setIdeas', ideas))
  },
  getIdeas({ commit }, params) {
    const finalParams = {
      page: 1,
      sortBy: 'date',
      ...params
    }

    const query = new URLSearchParams

    Object.keys(finalParams).forEach(param => query.append(param, finalParams[param]));

    return this.$api.v1.get(`/idea/?${query}`)
      .then(ideas => commit('setIdeas', ideas))
  }
}

export const getters = {
  list: state => state.list,
  own: state => state.own
}
