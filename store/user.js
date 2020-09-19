export const state = () => ({
  profile: null,
})

export const mutations = {
  setProfile: (state, profile) => state.profile = profile
}

export const actions = {
  async getProfile({ commit }) {
    const profile = await this.$api.v1.get('profile')

    commit('setProfile', profile)

    return profile
  },

  async update({ dispatch, state }, data) {
    const profile = { ...state.profile }

    Object.keys(data).forEach(key => {
      // patch state
      profile[key] = data[key]
    });

    await this.$api.v1.post('profile', profile)
    await dispatch('getProfile')
  }
}

export const getters = {
  profile: state => state.profile,
  isAuthorized: state => !!state.profile
}
