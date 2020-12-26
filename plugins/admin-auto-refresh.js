export default ({ store }) => {
  const isAdmin = store.getters['auth/isAdmin']

  if (isAdmin) {
    setInterval(() => {
      console.log('[ ADMIN ]: check for ideas');
      store.dispatch('admin/getPendingIdeas')
    }, 5000)
  }
}
