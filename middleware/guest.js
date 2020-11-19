export default ({ store, redirect }) => {
  const isAuthorized = store.getters['user/isAuthorized']

  if (isAuthorized) redirect('/s/dashboard')
}
