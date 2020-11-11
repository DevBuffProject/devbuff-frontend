export const state = () => ({
  token: null,
  refreshToken: null,
})

export const mutations = {
  setToken: (state, token) => state.token = token,
  setRefreshToken: (state, refreshToken) => state.refreshToken = refreshToken,
}

export const actions = {
  authorize() {
    const { API_BASE_URL } = this.$config
    window.location.href = `${API_BASE_URL}/oAuth/GitHub`
  },

  async checkToken(_, token) {
    const credentails = new URLSearchParams()
    credentails.set('token', token)

    return new Promise((resolve, reject) => {
      this.$api.v1
        .post(`oAuth/check`, credentails)
        .then(response => response.active ? resolve() : reject())
        .catch(reject)
    })
  },

  async getToken({ commit }, { grant, refresh = false }) {
    const cookies = this.$cookies
    const credentails = new URLSearchParams()

    const endpoint = refresh
      ? 'oAuth/update'
      : 'oAuth/GitHub'

    const grantType = refresh
      ? 'refresh_token'
      : 'github_oauth'

    const grantName = refresh
      ? 'refresh_token'
      : 'code'

    credentails.set(grantName, grant)
    credentails.set('grant_type', grantType)

    return this.$api.v1
      .post(endpoint, credentails)
      .then(({ access_token, refresh_token, expires_in }) => {
        this.$api.v1.setToken(access_token, 'Bearer')

        const nowToken = new Date()
        const nowRefresh = new Date()
        const tokenExpires = new Date(nowToken.setSeconds(nowToken.getSeconds() + expires_in))
        const refreshExpires = new Date(nowRefresh.setDate(nowRefresh.getDate() + 30))
        const cookieOptions = {
          SameSite: 'Lax',
          secure: true,
          path: '/'
        }

        cookies.remove('remix_token')
        cookies.remove('remix_refresh_token')

        cookies.set('remix_token', access_token, {
          expires: tokenExpires,
          ...cookieOptions
        })
        cookies.set('remix_refresh_token', refresh_token, {
          expires: refreshExpires,
          ...cookieOptions
        })

        commit('setToken', access_token)
        commit('setRefreshToken', refresh_token)
      })
  },
}

export const getters = {
  token: state => state.token,
  refreshToken: state => state.refreshToken
}
