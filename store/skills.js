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
  skills: state => state.skills,
  specializations: state => {
    const specs = state.skills.reduce((acc, skill) => {
      skill.specializations.forEach(spec => acc.push(spec.name))
      return acc
    }, [])

    return Array.from(new Set(specs))
  },
  languages: state => {
    const langs = state.skills.reduce((acc, lang) => {
      acc.push(lang.name)
      return acc
    }, [])

    return Array.from(new Set(langs))
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
