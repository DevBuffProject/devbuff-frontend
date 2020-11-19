export const state = () => ({
  skills: []
})

export const mutations = {
  setSkills: (state, skills) => state.skills = skills
}

export const actions = {
  async getSkills({ commit }) {
    const skills = await this.$api.v1.get('skills')

    commit('setSkills', skills)

    return skills
  }
}

export const getters = {
  skills: state => state.skills
}

export default {
  state,
  mutations,
  actions,
  getters
}
