export const state = () => ({
  skills: [],
})

export const mutations = {
  setSkills: (state, skills) => (state.skills = skills),
}

export const actions = {
  async getSkills({ commit }) {
    const skills = await this.$api.latest.get('skills')
    commit('setSkills', skills)
    return skills
  },
  async saveUserSkills({ commit }, skills) {
    await this.$api.latest.patch('profile', {
      skills,
    })
  },
}

export const getters = {
  skills: (state) => state.skills,
  specializations: (_, getters) => {
    const specializations = new Set(
      getters.skills.reduce((acc, skill) => {
        skill.specializations.forEach((spec) => acc.push(spec.name))
        return acc
      }, [])
    )
    return Array.from(specializations)
  },
  languages: (_, getters) => getters.skills.map((skill) => skill.name),
}

export default {
  state,
  mutations,
  actions,
  getters,
}
