export const state = () => ({
  auth: {
    token: null,
    refreshToken: null,
    status: null,
  },
  state: {},
})

export const mutations = {
  setAuthToken: (state, token) => (state.auth.token = token),
  setAuthStatus: (state, status) => (state.auth.status = status),
  setAuthRefreshToken: (state, refreshToken) =>
    (state.auth.refreshToken = refreshToken),
  setSession: (state, session) => (state = session),
  setState: (state, data) => (state.state = data),
  setItem: (state, { key, value }) => (state.state[key] = value),
  removeItem: (state, key) => delete state.state[key],
}

export const actions = {
  authorize() {
    const { API_BASE_URL } = this.$config
    window.location.href = `${API_BASE_URL}/oAuth/GitHub`
  },
  async checkToken({ commit }, token) {
    const credentails = new URLSearchParams()
    credentails.set('token', token)
    const status = await this.$api.latest.post('oAuth/check', credentails)
    commit('setAuthStatus', status || {})
    return status && status.active
  },
  async getToken({ commit }, { grant, refresh = false }) {
    const credentails = new URLSearchParams()
    const endpoint = refresh ? 'oAuth/update' : 'oAuth/GitHub'
    const grantType = refresh ? 'refresh_token' : 'github_oauth'
    const grantName = refresh ? 'refresh_token' : 'code'

    credentails.set(grantName, grant)
    credentails.set('grant_type', grantType)

    const response = await this.$api.latest.post(endpoint, credentails)
    // eslint-disable-next-line camelcase
    const { access_token, refresh_token } = response
    this.$api.latest.setToken(access_token, 'Bearer')

    commit('setAuthToken', access_token)
    commit('setAuthRefreshToken', refresh_token)

    return response
  },
}

export const getters = {
  auth: (state) => state.auth,
  token: (_, getters) => getters.auth.token,
  isAuth: (_, getters) => !!getters.auth.token || !!getters.auth.refreshToken,
  refreshToken: (_, getters) => getters.auth.refreshToken,
  status: (_, getters) => getters.auth.status,
  isAdmin: (_, getters) =>
    getters.status && getters.status.authorities.includes('ROLE_ADMIN'),
  state: (state) => state.state,
  stateItem: (_, getters) => (key) => getters.state[key],
}
