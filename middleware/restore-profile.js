export default async ({ store }) => {
  const token = store.getters['auth/token']

  if (token) {
    try {
      await store.dispatch('auth/checkToken', token)
      await store.dispatch('user/getProfile')
    } catch (e) {}
  }
}
