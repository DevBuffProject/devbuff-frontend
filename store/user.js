export const state = () => ({
  profile: null,
})

export const mutations = {
  setProfile: (state, profile) => state.profile = profile
}

export const actions = {
  async getProfile({ commit }) {
    return this.$api.v1
      .get('profile')
      .then(profile => commit('setProfile', profile))
  }
}

export const getters = {
  profile: state => state.profile
}
