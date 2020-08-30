export const state = () => ({
  list: []
})

export const actions = {
  async getIdeas({ commit }) {
    const response = await this.$api.v1.get('posts')
    const list = await response.json()

    commit('setIdeas', list)

    return list
  }
}

export const mutations = {
  setIdeas: (state, list) => state.list = list
}

export const getters = {
  list: state => state.list
}
