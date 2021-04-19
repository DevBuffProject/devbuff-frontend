export const state = () => ({})

export const actions = {
  async updateProfile({ dispatch, state }, data) {
    const profile = { ...state.profile }
    Object.keys(data).forEach((key) => (profile[key] = data[key]))
    await this.$api.latest.post('profile', profile)
  },
  async updateAvatar(_, image) {
    const formData = new FormData()
    formData.append('image', image)
    return await this.$api.latest.put('photo/profile', formData)
  },
  async resendVerifyMail() {
    return await this.$api.latest.post('profile/resendEmail')
  },
}
