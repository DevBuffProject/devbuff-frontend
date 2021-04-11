export default async ({ store }) => {
  const token = store.getters['session/token']

  if (token) {
    try {
      await store.dispatch('session/checkToken', token)
      await store.dispatch('user/getProfile')
    } catch (e) {}
  }
}
