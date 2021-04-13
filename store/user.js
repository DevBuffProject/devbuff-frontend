export const state = () => ({
  profile: null,
  user: null,
})

export const mutations = {
  setProfile: (state, profile) => (state.profile = profile),
  setUser: (state, user) => (state.user = user),
}

export const actions = {
  async updateAvatar(_, image) {
    const formData = new FormData()
    formData.append('image', image)
    return await this.$api.latest.put('photo/profile', formData)
  },
  async resendVerifyMail() {
    return await this.$api.latest.post('profile/resendEmail')
  },
  async getProfile({ commit }, uuid) {
    const profile = await this.$api.latest.get(
      uuid ? `profile/${uuid}` : 'profile'
    )
    commit(uuid ? 'setUser' : 'setProfile', profile)
    return profile
  },
  async updateProfile({ dispatch, state }, data) {
    const profile = { ...state.profile }
    Object.keys(data).forEach((key) => {
      // patch state
      profile[key] = data[key]
    })
    await this.$api.latest.post('profile', profile)
    await dispatch('getProfile')
  },
}

export const getters = {
  profile: (state) => state.profile,
  fullName: (_, getters) => `${getters.lastName} ${getters.firstName}`.trim(),
  user: (state) => state.user,
  isAuthorized: (state) => !!state.profile,
}
