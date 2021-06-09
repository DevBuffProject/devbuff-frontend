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
    return await this.$api.latest.post(`profile/resendEmail`)
  },

  async getProfile({commit}, uuid) {
    const {API_BASE_URL} = this.$config
    const profile = await this.$api.latest.get(uuid ? `profile/${uuid}` : 'profile')

    profile.avatar = `${API_BASE_URL}/photo/profile/${profile.id}`

    commit(uuid ? 'setUser' : 'setProfile', profile)

    return profile
  },

  async update({dispatch, state}, data) {
    const profile = {...state.profile}

    Object.keys(data).forEach(key => {
      // patch state
      profile[key] = data[key]
    });

    await this.$api.latest.post('profile', profile)
    await dispatch('getProfile')
  },

  async confirmEmail({dispatch, state}, token) {

    return new Promise(((resolve, reject) => {
      let params = new URLSearchParams();
      params.append('token', token);
      this.$api.latest.get('email/confirm?' + params.toString()).then(response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    }));
  }
}

export const getters = {
  profile: state => state.profile,
  user: state => state.user,
  isAuthorized: state => !!state.profile
}