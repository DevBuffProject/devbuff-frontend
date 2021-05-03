export const state = () => ({
  user: {
    data: {},
    avatar: {},
  },
  profile: {},
})

export const mutations = {
  setUser: (state, user) => (state.user = user),
  setAvatar: (state, avatar) => {
    const random = Math.ceil(Math.random() * 1000)
    state.profile.avatar = `${avatar}?${random}`
  },
  setProfile: (state, profile) => (state.profile = profile),
}

export const actions = {
  async getUser({ commit }, uuid) {
    const user = await this.$api.latest.get(`profile/${uuid}`)
    commit('setAvatar', `${this.$config.API_BASE_URL}/photo/profile/${uuid}`)
    commit('setUser', user)
    return user
  },
  async getProfile({ commit, dispatch }, uuid) {
    const profile = await this.$api.latest.get(`profile/${uuid}`)
    profile.avatar = `${this.$config.API_BASE_URL}/photo/profile/${uuid}`

    profile.ideas = await this.$api.latest.get(`idea/user/${uuid}`)

    if (profile.countryId) {
      profile.country = await dispatch(
        'hints/getCountryById',
        profile.countryId,
        {
          root: true,
        }
      )
    }
    if (profile.cityId) {
      profile.city = await dispatch('hints/getCityById', profile.cityId, {
        root: true,
      })
    }

    commit('setProfile', profile)
    return profile
  },
}

export const getters = {
  avatar: (state) => state.profile.avatar,
  profile: (state) => state.profile,
  fullName: (_, getters) => `${getters.lastName} ${getters.firstName}`.trim(),
}
