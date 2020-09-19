import Cookies from 'universal-cookie'

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

  async checkToken({ commit }, credentails) {
    return new Promise((resolve, reject) => {

    })
  },

  async getToken({ commit }, { grant, refresh = false }) {
    const cookies = new Cookies()
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

        const date = new Date()
        const expires = new Date(date.setFullYear(date.getFullYear() + 1))

        const cookieOptions = {
          expires,
          SameSite: 'Lax',
          secure: true,
        }

        cookies.set('remix_token', access_token, cookieOptions)
        cookies.set('remix_refresh_token', refresh_token, cookieOptions)

        commit('setToken', access_token)
        commit('setRefreshToken', refresh_token)
      })
  },
}

export const getters = {
  token: state => state.token,
  refreshToken: state => state.refreshToken
}
