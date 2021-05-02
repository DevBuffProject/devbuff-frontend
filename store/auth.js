export const state = () => ({
  tokens: {},
  status: {},
  user: {},
  state: {},
})

export const mutations = {
  setTokens: (state, tokens) => (state.tokens = tokens),
  setState: (state, data) => (state.state = data),
  setUser: (state, user) => (state.user = user),
  setStatus: (state, status) => (state.status = status),
  setItem: (state, { key, value }) => (state.state[key] = value),
  removeItem: (state, key) => delete state.state[key],
}

export const actions = {
  authorize() {
    const { API_BASE_URL } = this.$config
    window.location.href = `${API_BASE_URL}/oAuth/GitHub`
  },
  async getUser({ commit }) {
    const user = await this.$api.latest.get('profile')
    const random = Math.round(Math.random() * 1000)
    commit('setUser', {
      ...user,
      avatar: `${this.$config.API_BASE_URL}/photo/profile/${user.id}?${random}`,
    })
    return user
  },
  async checkToken({ commit }, token) {
    const credentails = new URLSearchParams()
    credentails.set('token', token)
    const status = await this.$api.latest.post('oAuth/check', credentails)
    commit('setStatus', status || {})
    return status
  },
  upTokens({ commit }) {
    const { $cookies } = this
    const _token = $cookies.get('dbuff_token')
    const refreshToken = $cookies.get('dbuff_refresh_token')
    if (_token) {
      const [type, accessToken] = _token.split(':')
      this.$api.latest.setToken(accessToken, type)
      commit('setTokens', { accessToken, refreshToken, type })
    }
  },
  installTokens(
    { commit },
    { accessToken, refreshToken, expires, type = 'Bearer' }
  ) {
    const { $cookies } = this
    const now = new Date()
    let tokenExpires = new Date()
    let refreshExpires = new Date()
    const cookieOptions = {
      SameSite: 'Lax',
      path: '/',
    }

    tokenExpires = new Date(tokenExpires.setSeconds(now.getSeconds() + expires))
    refreshExpires = new Date(refreshExpires.setDate(now.getDate() + 30))

    this.$api.latest.setToken(accessToken, type)

    $cookies.set('dbuff_token', [type, accessToken].join(':'), {
      expires: tokenExpires,
      ...cookieOptions,
    })
    $cookies.set('dbuff_refresh_token', refreshToken, {
      expires: refreshExpires,
      ...cookieOptions,
    })

    commit('setTokens', { accessToken, refreshToken, type })
  },
  async refresh({ commit, dispatch }, refreshToken) {
    const credentails = new URLSearchParams()
    credentails.set('refresh_token', refreshToken)
    credentails.set('grant_type', 'refresh_token')

    const tokens = await this.$api.latest.post('oAuth/update', credentails)

    dispatch('installTokens', {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expires: tokens.expires,
      type: tokens.type,
    })

    return tokens
  },
  async login({ commit, dispatch }, code) {
    const credentails = new URLSearchParams()
    credentails.set('code', code)
    credentails.set('grant_type', 'github_oauth')

    const tokens = await this.$api.latest.post('oAuth/GitHub', credentails)

    dispatch('installTokens', {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expires: tokens.expires,
      type: tokens.type,
    })

    return tokens
  },
  reset({ commit }) {
    const { $cookies } = this

    $cookies.remove('dbuff_token')
    $cookies.remove('dbuff_refresh_token')

    commit('setTokens', {})

    this.$api.latest.setToken(null)
  },
}

export const getters = {
  tokens: (state) => state.tokens,
  status: (state) => state.status,
  user: (state) => state.user,
  isAuth: (_, getters) => getters.status?.active,
  isAdmin: (_, getters) =>
    getters.status?.active && getters.status.authorities.includes('ROLE_ADMIN'),
  state: (state) => state.state,
  stateItem: (_, getters) => (key) => getters.state[key],
}
