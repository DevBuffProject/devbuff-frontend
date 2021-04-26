export const state = () => ({
  user: {
    data: {},
    avatar: {},
  },
})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  setAvatar: (state, avatar) => {
    const random = Math.ceil(Math.random() * 1000)
    state.profile.avatar = `${avatar}?${random}`
  },
}

export const actions = {
  async getUser({ commit }, uuid) {
    const user = await this.$api.latest.get(`profile/${uuid}`)
    commit('setAvatar', `${this.$config.API_BASE_URL}/photo/profile/${uuid}`)
    commit('setUser', user)
    return user
  },
}

export const getters = {
  avatar: (state) => state.profile.avatar,
  fullName: (_, getters) => `${getters.lastName} ${getters.firstName}`.trim(),
}
