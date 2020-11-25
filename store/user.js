export const state = () => ({
  profile: null,
  user: null,
})

export const mutations = {
  setProfile: (state, profile) => state.profile = profile,
  setUser: (state, user) => state.user = user
}

export const actions = {
  async resendVerifyMail() {
    return await this.$api.v1.post(`profile/resendEmail`)
  },

  async getUser({ commit }, uuid) {
    const { API_BASE_URL } = this.$config
    // const user = await this.$api.v1.get(`profile/${uuid}`)

    console.log(uuid);

    // user.avatar = `${API_BASE_URL}/photo/profile/${user.id}`

    // commit('setUser', user)

    // return user
  },

  async getProfile({ commit }) {
    const { API_BASE_URL } = this.$config
    const profile = await this.$api.v1.get('profile')

    profile.avatar = `${API_BASE_URL}/photo/profile/${profile.id}`

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
  user: state => state.user,
  isAuthorized: state => !!state.profile
}
