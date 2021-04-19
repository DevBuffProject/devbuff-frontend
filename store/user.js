export const state = () => ({
  profile: {
    data: {},
    avatar: '',
  },
  user: {
    data: {},
    avatar: {},
  },
})

export const mutations = {
  setProfile: (state, profile) => (state.profile.data = profile),
  setUser: (state, user) => (state.user = user),
  setAvatar: (state, avatar) => {
    const random = Math.ceil(Math.random() * 1000)
    state.profile.avatar = `${avatar}?${random}`
  },
}

export const actions = {
  async getProfile({ commit }) {
    const profile = await this.$api.latest.get('profile')
    commit(
      'setAvatar',
      `${this.$config.API_BASE_URL}/photo/profile/${profile.id}`
    )
    commit('setProfile', profile)
    return profile
  },
  async getUser({ commit }, uuid) {
    const user = await this.$api.latest.get(`profile/${uuid}`)
    commit('setAvatar', `${this.$config.API_BASE_URL}/photo/profile/${uuid}`)
    commit('setUser', user)
    return user
  },
}

export const getters = {
  profile: (state) => state.profile.data,
  avatar: (state) => state.profile.avatar,
  fullName: (_, getters) => `${getters.lastName} ${getters.firstName}`.trim(),
  isAuthorized: (state) => !!state.profile,
}
