export const state = () => ({
  health: {},
  error: {},
})

export const mutations = {
  setHealth: (state, health) => (state.health = health),
  setError: (state, error) => (state.error = error),
}

export const actions = {
  async getHealth({ commit }) {
    const { STATUSPAGE_BASE_URL } = this.$config
    const { data } = await this.$axios.get(`${STATUSPAGE_BASE_URL}/status.json`)
    commit('setHealth', data, { root: true })
    return data
  },

  async nuxtServerInit({ dispatch, getters }) {
    dispatch('auth/upTokens')
    await dispatch('getHealth')
    const { accessToken, refreshToken } = getters['auth/tokens']

    if (accessToken && refreshToken) {
      try {
        await dispatch('auth/checkToken', accessToken)
      } catch (e) {
        await dispatch('auth/refresh', refreshToken)
      } finally {
        try {
          await dispatch('auth/checkToken', accessToken)
          await dispatch('auth/getUser')
        } catch (e) {}
      }
    } else {
      dispatch('auth/reset')
    }
  },
}

export const getters = {
  health: (state) => state.health,
  error: (state) => state.error,
}
