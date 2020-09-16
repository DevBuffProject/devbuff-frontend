export const state = () => ({
  list: []
})

export const actions = {
  async getIdeas({ commit }) {
    return this.$api.v1.get('idea')
      .then(r => console.log(r))
  }
}

export const mutations = {
  setIdeas: (state, list) => state.list = list
}

export const getters = {
  list: state => state.list
}
